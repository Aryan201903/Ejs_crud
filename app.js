var db = require("./db_conn.js");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: "G8_21" }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/review", function (req, res) {
  res.sendFile(__dirname + "/review.html");
});
app.get("/contactUs", function (req, res) {
  res.sendFile(__dirname + "/contactUs.html");
});
app.get("/addUser", function (req, res) {
  res.sendFile(__dirname + "/user.html");
});

app.post("/user_submit", function (req, res) {
  let { fname, lname, uname, mail, psd } = req.body;
  let sql =
    "insert into user (fname , lname , uname , mail , psd) values ( ? , ? ,? , ? , ?)";
  let values = [fname, lname, uname, mail, psd];
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    res.send(`
      <p>Welcome to the family!</p>
      <a href="/">Home</a>
    `);
  });
});
app.post("/review_submit", function (req, res) {
  let { uname, mail, date, review } = req.body;
  let sql =
    "insert into review (uname, mail, date, review) values ( ? ,? , ? , ?)";
  let values = [uname, mail, date, review];
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    res.send(`
      <p>Thank you for the review!</p>
      <a href="/">Home</a>
    `);
  });
});

app.post("/contact_submit", function (req, res) {
  let { uname, mail, message } = req.body;
  let currentdate = new Date();
  let date =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate();
  let sql =
    "insert into contactUs (uname, mail, msg, date ) values ( ? ,? , ? , ?)";
  let values = [uname, mail, message, date];
  db.query(sql, values, function (err, result) {
    if (err) throw err;
    res.send(`
      <p>Thank you for contacting us!</p>
      <a href="/">Home</a>
    `);
  });
});

app.listen(8070);
