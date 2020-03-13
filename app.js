var express = require("express");
var app = express();
var Users = require("./Routes/SystemAdmin/Users");
var usergroups = require("./Routes/SystemAdmin/UserGroups");
var Signup = require("./Routes/SystemAdmin/Signup");
var Mailer = require("./Routes/SystemAdmin/Mailer");
var auth = require("./auth");
var ValidateTokenExpiry = require("./Routes/SystemAdmin/ValidateTokenExpiry");
var GroupAccess = require("./Routes/SystemAdmin/GroupAccess");
var configurations = require("./Routes/SystemAdmin/configurations");
var Registration=require("./Routes/Applications/Registration");
var Facility=require("./Routes/SetUps/Facility");
var Minor= require("./Routes/Applications/Minor");
var Roles = require("./Routes/SystemAdmin/Roles");
var SMSdetails=require("./Routes/SetUps/SMSdetails");
var Auditrails = require("./Routes/SystemAdmin/Auditrails");
var bodyParser = require("body-parser");
var Uploadfiles = require("./Routes/SystemAdmin/Uploadfiles");
var updateprofile = require("./Routes/SystemAdmin/updateprofile");
var UserAccess = require("./Routes/SystemAdmin/UserAccess");
//setups

var EmailVerification = require("./Routes/SystemAdmin/EmailVerification");
var ResetPassword = require("./Routes/SystemAdmin/ResetPassword");
var sms = require("./Routes/SMS/sms");
var Dashboard = require("./Routes/Applications/Dashboard");
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static("uploads"));
app.use(express.static("Reports"));
//app.use("/Reports", express.static(__dirname + "Reports"));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/ValidateTokenExpiry", ValidateTokenExpiry);
app.use("/AuthToken", auth.router);

app.use("/api/Signup", Signup);
app.use("/api/login", auth.router);
app.use("/api/upload", Uploadfiles);
app.use("/api/sendmail", Mailer.Mailer);
app.use("/api/EmailVerification", EmailVerification);
app.use("/api/sendsms", sms);
app.use("/api/ResetPassword", ResetPassword);
app.use(auth.validateToken);;
app.use("/api/SMSdetails", SMSdetails);
app.use("/api/UpdateProfile", updateprofile);
app.use("/api/users", Users);
app.use("/api/Registration",Registration);
app.use("/api/Facility",Facility);
app.use("/api/usergroups", usergroups);
app.use("/api/roles", Roles);
app.use("/api/Minor",Minor);
app.use("/api/auditrails", Auditrails);
app.use("/api/UserAccess", UserAccess);
app.use("/api/GroupAccess", GroupAccess);
app.use("/api/configurations", configurations);
app.use("/api/Dashboard", Dashboard);
app.use((req, res, next) => {
  const error = new Error("resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
