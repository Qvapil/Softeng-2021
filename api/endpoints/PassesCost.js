const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../connect.js");
const converter=require('json-2-csv');

function passes_cost(req,res) {
  //check request parameters
  if(req.params.op1_ID===undefined || req.params.op2_ID===undefined || req.params.date_from===undefined || req.params.date_to===undefined) {
    res.status(400).send({"status":"missing or invalid parameters"})
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
  console.log("PassesCost request at "+dateTime);

  //fix format of date request parameters
  var per_from=req.params.date_from.substring(0,4)+"-"+req.params.date_from.substring(4,6)+"-"+req.params.date_from.substring(6,8);
  var per_to=req.params.date_to.substring(0,4)+"-"+req.params.date_to.substring(4,6)+"-"+req.params.date_to.substring(6,8);

  let myQuery='SELECT owns.provider_name as op1_ID, tag.provider_name as op2_ID, "'+dateTime+'" as RequestTimeStamp, "'+per_from+'" as PeriodFrom, "'+per_to+'" as PeriodTo, count(pass.pass_id) as NumberOfPasses, ROUND(sum(pass.amount_charged),2) as PassesCost FROM pass, owns, tag WHERE pass.station_ID=owns.station_id AND pass.vehicle_id=tag.vehicle_id AND owns.provider_name="'+req.params.op1_ID+'" AND tag.provider_name="'+req.params.op2_ID+'" AND pass.time_stamp>"'+per_from+'" AND pass.time_stamp<="'+per_to+'" GROUP BY owns.provider_name;';
  connect.con.query(myQuery,function(err,result,fields) {
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
        converter.json2csv(result,(err,csv) => {
          if(err) { res.status(500).send({"status":"Error converting to csv"}); return; }
          else {
            res.status(200).send(csv);
            return;
          }
        });
      }
      else if (format===undefined || format==='json') {
        res.status(200).send(result);
        return;
      }
      else {
        res.status(400).send({"status":"missing or invalid parameters"});
        return;
      }
    }
  });
}

router.get('/PassesCost/:op1_ID?/:op2_ID?/:date_from?/:date_to?',passes_cost);

module.exports={
  router
}
