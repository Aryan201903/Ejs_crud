var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "name of database",
  password: "pass",
});
db.connect(function (err) {
  if (err) throw err;
});
module.exports = db;
