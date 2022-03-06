const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../../connect.js")
const fs = require('fs')
const CSV=require('csv-string')

function reset_stations(req,res) {
  //get timestamp of request
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log("ADMIN: resetstations request at "+dateTime);

  //delete all stations
  //table owns also gets deleted due to cascading
  let myQuery="DELETE FROM station;";
  connect.con.query(myQuery, function(err, result, fields) {
    if(err) {
      res.status(500).send({"status":"failed"});
      return;
    }
  });
  //read sample data
  var csv;
  fs.readFile('../Sample_data/sampledata01_stations.csv', 'utf8' , (err, data) => {
    if (err) {
      res.status(500).send({"status":"failed"});
      return;
    }
    csv=CSV.parse(data);
    csv.shift();  //omit first row
    var query1='';
    var query2='';
    //insert data into station and owns tables
    for(const row of csv) {
      query1='INSERT INTO station (station_id, station_name) VALUES ("'+row[0]+'","'+row[2]+'");';
      query2='INSERT INTO owns (provider_name, station_id) VALUES ("'+row[1]+'","'+row[0]+'");';
      connect.con.query(query1, function(err,result,fields) {
        if (err) {
          res.status(500).send({"status":"failed"});
          return;
        }
      });
      connect.con.query(query2, function(err,result,fields) {
        if (err) {
          res.status(500).send({"status":"failed"});
          return;
        }
      });
    }
    res.status(200).send({"status":"OK"});
    return;
  });
}

router.post('/admin/resetstations',reset_stations);

module.exports={
  router
}
