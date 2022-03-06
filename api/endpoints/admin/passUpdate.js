const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../../connect.js");

function addPass(req,res) {
  //check request parameters
  if(req.params.pass_ID===undefined || req.params.vehicle_ID===undefined || req.params.station_ID===undefined || req.params.timestamp===undefined || req.params.euros===undefined || req.params.cents===undefined) {
    res.status(400).send({"status":"missing parameters"})
    return;
  }
  if(req.params.euros<0 || req.params.cents<0 || req.params.cents>99) {
    res.status(400).send({"status":"invalid parameters"})
    return;
  }

  //get timestamp of request
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log("ADMIN: passUpdate request at "+dateTime);

  //fix format of timestamp parameter
  var time_stamp=req.params.timestamp.substring(0,4)+"-"+req.params.timestamp.substring(4,6)+"-"+req.params.timestamp.substring(6,8)+" "+req.params.timestamp.substring(8,10)+":"+req.params.timestamp.substring(10,12)+":"+req.params.timestamp.substring(12,14);

  let myQuery="INSERT INTO pass (pass_id, vehicle_id, station_id, time_stamp, amount_charged) VALUES ('"+req.params.pass_ID+"', '"+req.params.vehicle_ID+"', '"+req.params.station_ID+"', '"+time_stamp+"', '"+req.params.euros+"."+req.params.cents+"');";
  connect.con.query(myQuery, function(err, result, fields) {
    if(err) {
      res.status(500).send({"status":"failed"});
    }
    else {
      res.status(200).send({"status":"OK"});
    }
  });
}

router.post('/admin/passUpdate/:pass_ID?/:vehicle_ID?/:station_ID?/:timestamp?/:euros?/:cents?',addPass);

module.exports={
  router
}
