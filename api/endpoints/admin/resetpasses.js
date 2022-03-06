const express=require('express');
const router=express.Router();
var mysql=require('mysql');
const connect=require("../../connect.js");

function reset_passes(req,res) {
  //get timestamp of request
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  console.log("ADMIN: resetpasses request at "+dateTime);

  //delete all passes
  let myQuery="DELETE FROM pass;";
  connect.con.query(myQuery, function(err, result, fields) {
    if(err) {
      res.status(500).send({"status":"failed"});
    }
    else {
      res.status(200).send({"status":"OK"});
    }
  });
}

router.post('/admin/resetpasses',reset_passes);

module.exports={
  router
}
