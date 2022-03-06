var mysql=require('mysql');
var connectionString="mysql://user@localhost/tolltag"
var con=mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "",
  database: "tolltag"
});

module.exports={
  connectionString,
  con
}
