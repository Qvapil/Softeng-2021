const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../connect.js");
const converter=require('json-2-csv');

function passes_per_station(req,res) {
  //check request parameters
  if(req.params.stationID===undefined || req.params.date_from===undefined || req.params.date_to===undefined) {
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
  console.log("PassesPerStation request at "+dateTime);

  //fix format of date request parameters
  var per_from=req.params.date_from.substring(0,4)+"-"+req.params.date_from.substring(4,6)+"-"+req.params.date_from.substring(6,8);
  var per_to=req.params.date_to.substring(0,4)+"-"+req.params.date_to.substring(4,6)+"-"+req.params.date_to.substring(6,8);

  //query 1, general info
  let myQuery='SELECT station.station_name as Station, owns.provider_name as StationOperator,"'+dateTime+'" as RequestTimeStamp, "'+per_from+'" as PeriodFrom,"'+per_to+'" as PeriodTo, count(pass.pass_id) as NumberOfPasses FROM owns,pass,station WHERE station.station_id=owns.station_id AND owns.station_id=pass.station_id AND owns.station_id="'+req.params.stationID+'" AND pass.time_stamp>"'+per_from+'" AND pass.time_stamp<="'+per_to+'" GROUP BY pass.station_id;';
  var general;
  connect.con.query(myQuery, function(err, result, fields) {
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

      let query2='SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 0)) AS PassIndex, pass.pass_id as PassID, pass.time_stamp as PassTimeStamp, pass.vehicle_id as VehicleID, tag.provider_name as TagProvider, IF(tag.provider_name=owns.provider_name,"home","visitor") as PassType, pass.amount_charged as PassCharge FROM pass, owns, provider, tag WHERE pass.station_id=owns.station_id AND owns.provider_name=provider.provider_name AND pass.vehicle_id=tag.vehicle_id AND pass.time_stamp>"'+per_from+'" AND pass.time_stamp<="'+per_to+'" AND pass.station_id="'+req.params.stationID+'";'
      connect.con.query(query2, function(err, result, fields) {
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
    }
  });
}

router.get('/PassesPerStation/:stationID?/:date_from?/:date_to?',passes_per_station);

module.exports={
  router
}
