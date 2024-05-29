var db = require("../db_conn.js");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({ secret: "G8_21" }));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/showuser", function (req, res) {
  db.query("select * from user", function (err, result) {
    if (err) {
      throw err;
    }
    res.render("userList", { result: result });
  });
});

app.get("/showLogin", function (req, res) {
  db.query("select * from signup", function (err, result) {
    if (err) {
      throw err;
    }
    res.render("signuplist", { result: result });
  });
});

app.get("/showreview", function (req, res) {
  db.query("select * from review", function (err, result) {
    if (err) {
      throw err;
    }
    res.render("reviewList", { result: result });
  });
});
app.get("/showcontact", function (req, res) {
  db.query("select * from contactus", function (err, result) {
    if (err) {
      throw err;
    }
    res.render("contactList", { result: result });
  });
});

// Actions on the lists

app.get("/deluser", function (req, res) {
  let id = req.query["id"];
  db.query("delete from user where uid=" + id, function (err, result) {
    if (err) throw err;
    res.redirect("showuser");
  });
});
app.get("/edituser", function (req, res) {
  let id = req.query["id"];
  db.query("select * from user where uid=" + id, function (err, result) {
    if (err) throw err;
    res.render("edituser", { result: result });
  });
});

app.post("/useredit_submit", function (req, res) {
  const { uid, fname, lname, uname, mail } = req.body;
  let sql = "UPDATE user set fname=?,lname=?,uname=?,mail=? where uid=?";
  let values = [fname, lname, uname, mail, uid];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
      // You might want to send an error response to the client here
    }
    res.redirect("/showuser");
  });
});

app.get("/delreview", function (req, res) {
  let id = req.query["id"];
  db.query("delete from review where srNo=" + id, function (err, result) {
    if (err) throw err;
    res.redirect("showreview");
  });
});

app.get("/editreview", function (req, res) {
  let id = req.query["id"];
  db.query("select * from review where srNo=" + id, function (err, result) {
    if (err) throw err;
    res.render("editreview", { result: result });
  });
});

app.post("/revedit_submit", function (req, res) {
  const { srNo, uname, mail, review } = req.body;
  let sql = "UPDATE review set uname=?,mail=?,review=? where srNo=?";
  let values = [uname, mail, review, srNo];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
      // You might want to send an error response to the client here
    }
    res.redirect("/showreview");
  });
});

app.get("/deletecontact", function (req, res) {
  let id = req.query["id"];
  db.query("delete from contactus where uid=" + id, function (err, result) {
    if (err) throw err;
    res.redirect("showcontact");
  });
});

app.get("/editcontact", function (req, res) {
  let id = req.query["id"];
  db.query("select * from contactus where uid=" + id, function (err, result) {
    if (err) throw err;
    res.render("editcontact", { result: result });
  });
});

app.post("/contactedit_submit", function (req, res) {
  const { uid, uname, mail, msg } = req.body;
  let sql = "UPDATE contactus set uname=?,mail=?,msg=? where uid=?";
  let values = [uname, mail, msg, uid];
  db.query(sql, values, function (err, result) {
    if (err) {
      throw err;
      // You might want to send an error response to the client here
    }
    res.redirect("/showcontact");
  });
});

app.listen(8000);
