const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../connect.js");
const converter=require('json-2-csv');

function charges_by(req,res) {
  //check parameters
  if(req.params.op_ID===undefined || req.params.date_from===undefined || req.params.date_to===undefined) {
    res.status(400).send({"status":"missing parameters"})
    return;
  }
  if(req.params.date_from.length!=8 || req.params.date_to.length!=8) {
    res.status(400).send({"status":"invalid parameters"})
    return;
  }

  //get timestamp of request
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log("ChargesBy request at "+dateTime);

  //fix format of date request parameters
  var per_from=req.params.date_from.substring(0,4)+"-"+req.params.date_from.substring(4,6)+"-"+req.params.date_from.substring(6,8);
  var per_to=req.params.date_to.substring(0,4)+"-"+req.params.date_to.substring(4,6)+"-"+req.params.date_to.substring(6,8);

  //create general info json
  let text='{"op_ID": "'+req.params.op_ID+'", "RequestTimeStamp": "'+dateTime+'", "PeriodFrom": "'+per_from+'", "PeriodTo": "'+per_to+'"}';
  const general=JSON.parse(text);

  //query database
  let myQuery='SELECT tag.provider_name as VisitingOperator, count(pass.pass_id) as NumberOfPasses, ROUND(sum(pass.amount_charged),2) as PassesCost FROM pass, owns, tag WHERE pass.station_id=owns.station_id AND pass.vehicle_id=tag.vehicle_id AND owns.provider_name="'+req.params.op_ID+'" AND owns.provider_name!=tag.provider_name AND pass.time_stamp>"'+per_from+'" AND pass.time_stamp<="'+per_to+'" group by tag.provider_name;';
  connect.con.query(myQuery, function(err,result,fields) {
    if(err) {
      res.status(500).send({"status":"Error executing query"});
      return;
    }
    else if (result.length==0) {
      res.status(402).send({"status":"No data"});
      return;
    }
    else {
      //send in correct format
      const format=req.query.format;
      if(format==='csv') {
        //convert passes list to csv
        converter.json2csv(result,(err,csv) => {
          if(err) { res.status(500).send({"status":"Error converting to csv"}); return; }
          else {
            general.PPOList=csv;
            //convert to csv
            converter.json2csv([general],(err,csv) => {
              if(err) { res.status(500).send({"status":"Error converting to csv"}); return; }
              else {
                res.status(200).send(csv);
                return;
              }
            });
          }
        });
      }
      else if (format===undefined || format==='json') {
        general.PPOList=result;
        res.status(200).send([general]);
        return;
      }
      else {
        res.status(400).send({"status":"missing or invalid parameters"});
        return;
      }
    }
  });

}

router.get('/ChargesBy/:op_ID?/:date_from?/:date_to?',charges_by);

module.exports={
  router
}
