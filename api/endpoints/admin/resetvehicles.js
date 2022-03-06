const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../../connect.js")
const fs = require('fs')
const CSV=require('csv-string')

function reset_vehicles(req,res) {
  //get timestamp of request
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log("ADMIN: resetvehicles request at "+dateTime);

  //delete tag and vehicle entries
  //pass also gets deleted due to cascade
  let myQuery="DELETE FROM tag;";
  connect.con.query(myQuery, function(err, result, fields) {
    if(err) {
      res.status(500).send({"status":"failed"});
      return;
    }
  });
  let myQuery2="DELETE FROM vehicle;";
  connect.con.query(myQuery2, function(err, result, fields) {
    if(err) {
        res.status(500).send({"status":"failed"});
        return;
    }
  });

  var csv;
  fs.readFile('../Sample_data/sampledata01_vehicles_100.csv', 'utf8' , (err, data) => {
    if (err) {
      res.status(500).send({"status":"failed"});
      return;
    }
    csv=CSV.parse(data);
    csv.shift();  //omit first row
    var query1='';
    var query2='';
    //insert data into vehicle and tag tables
    for(const row of csv) {
      query1='INSERT INTO vehicle (vehicle_id, licence_year) VALUES ("'+row[0]+'","'+row[4]+'");';
      query2='INSERT INTO tag (tag_id, vehicle_id, provider_name) VALUES ("'+row[1]+'","'+row[0]+'","'+row[2]+'");';
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

router.post('/admin/resetvehicles',reset_vehicles);

module.exports={
  router
}
