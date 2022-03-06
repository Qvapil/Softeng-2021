const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../connect.js");
const converter=require('json-2-csv');

function passes_analysis(req,res) {
  //check request parameters
  if(req.params.op1_ID===undefined || req.params.op2_ID===undefined || req.params.date_from===undefined || req.params.date_to===undefined) {
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
  console.log("PassesAnalysis request at "+dateTime);

  //fix format of date request parameters
  var per_from=req.params.date_from.substring(0,4)+"-"+req.params.date_from.substring(4,6)+"-"+req.params.date_from.substring(6,8);
  var per_to=req.params.date_to.substring(0,4)+"-"+req.params.date_to.substring(4,6)+"-"+req.params.date_to.substring(6,8);

  var general;
  let query1='SELECT owns.provider_name as op1_ID, tag.provider_name as op2_ID, "'+dateTime+'" as RequestTimeStamp, "'+per_from+'" as PeriodFrom, "'+per_to+'" as PeriodTo, count(pass.pass_id) as NumberOfPasses FROM pass, owns, tag WHERE pass.station_ID=owns.station_id AND pass.vehicle_id=tag.vehicle_id AND owns.provider_name="'+req.params.op1_ID+'" AND tag.provider_name="'+req.params.op2_ID+'" AND pass.time_stamp>"'+per_from+'" AND pass.time_stamp<="'+per_to+'" group by owns.provider_name;';
  connect.con.query(query1, function(err, result, fields) {
    if(err) {
      res.status(500).send({"status":"Error executing query"});
      return;
    }
    else if (result.length==0) {
      res.status(402).send({"status":"No data"});
      return;
    }
    else {
      general=result;

      let query2='SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS PassIndex, pass.pass_id as PassID, pass.station_id as StationID, pass.time_stamp as PassTimeStamp, pass.vehicle_id as VehicleID, pass.amount_charged as Charge FROM pass, owns, tag WHERE pass.station_ID=owns.station_id AND pass.vehicle_id=tag.vehicle_id AND owns.provider_name="'+req.params.op1_ID+'" AND tag.provider_name="'+req.params.op2_ID+'" AND pass.time_stamp>"'+per_from+'" AND pass.time_stamp<="'+per_to+'";';
      connect.con.query(query2, function(err,result,fields) {
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
                general.forEach(function(obj) {
                  obj.PassesList=csv;
                });
                //convert to csv
                converter.json2csv(general,(err,csv) => {
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
            general.forEach(function(obj) {
              obj.PassesList=result;
            });
            res.status(200).send(general);
            return;
          }

          else {
            res.status(400).send({"status":"missing or invalid parameters"});
            return;
          }
        }
      });

      // res.status(200).send(general);
    }
  });
}

router.get('/PassesAnalysis/:op1_ID?/:op2_ID?/:date_from?/:date_to?',passes_analysis);

module.exports={
  router
}
