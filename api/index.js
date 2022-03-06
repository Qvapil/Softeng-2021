const express=require('express')
const app=express();
const port=9103;
const bodyparser=require('body-parser');
var path=require('path');
const connect=require('./connect.js');
var cors = require('cors');
app.use(cors());

connect.con.connect(function(err) {
  if(err) {
    console.log("Error: could not connect to database");
  }
  else {
    console.log("Connected to database");
  }
});

app.use(bodyparser.json())

app.listen(port, ()=> {
  console.log("Server is running on port "+port);
});

const baseurl='/interoperability/api';

//path to each endpoint code file
const healthcheck=require('./endpoints/admin/healthcheck.js');
const resetpasses=require('./endpoints/admin/resetpasses.js');
const resetstations=require('./endpoints/admin/resetstations.js');
const resetvehicles=require('./endpoints/admin/resetvehicles.js');
const passupdate=require('./endpoints/admin/passUpdate.js');
const passesPerStation=require('./endpoints/PassesPerStation.js');
const passesCost=require('./endpoints/PassesCost.js');
const passesAnalysis=require('./endpoints/PassesAnalysis.js');
const chargesBy=require('./endpoints/ChargesBy.js');

app.use(baseurl,healthcheck.router);
app.use(baseurl,resetpasses.router);
app.use(baseurl,resetstations.router);
app.use(baseurl,resetvehicles.router);
app.use(baseurl,passupdate.router);
app.use(baseurl,passesPerStation.router);
app.use(baseurl,passesCost.router);
app.use(baseurl,passesAnalysis.router);
app.use(baseurl,chargesBy.router);
