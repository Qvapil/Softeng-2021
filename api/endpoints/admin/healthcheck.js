const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../../connect.js");

function checkconnection(req,res) {
  //get timestamp of request
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log("ADMIN: healthcheck request at "+dateTime);

  connect.con.ping(err => {
    //healthcheck failed
    if(err) {
      res.status(500).send({"status":"failed","dbconnection":connect.connectionString});
    }
    //healthcheck succeeded
    else {
      res.status(200).send({"status":"OK","dbconnection":connect.connectionString});
    }
  });
}

router.get('/admin/healthcheck',checkconnection);

module.exports={
  router
}
