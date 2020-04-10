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
var Educational=require("./Routes/Applications/Educational");
var Parent=require("./Routes/Applications/Parent");
var NextOFKin=require("./Routes/Applications/NextOfKin");
var Siblings=require("./Routes/Applications/Siblings")
var Minor= require("./Routes/Applications/Minor");
var DCI=require("./Routes/Applications/DCI");
var Passport =require("./Routes/Applications/passport");
var Contract=require("./Routes/Applications/Contract");
var Training=require("./Routes/Applications/Training");
var Major=require("./Routes/Applications/Major");
var NEAA=require("./Routes/Applications/NEAA");
var Visa=require("./Routes/Applications/Visa");
var Attestation=require("./Routes/Applications/Attestation");
var Ticketing=require("./Routes/Applications/Ticketing");
var Final =require("./Routes/Applications/Final");
var Travelling=require("./Routes/Applications/Travelling");
var Roles = require("./Routes/SystemAdmin/Roles");
var SMSdetails=require("./Routes/SetUps/SMSdetails");
var Auditrails = require("./Routes/SystemAdmin/Auditrails");
var bodyParser = require("body-parser");
var Uploads = require("./routes/SystemAdmin/Uploads");
var updateprofile = require("./Routes/SystemAdmin/updateprofile");
var UserAccess = require("./Routes/SystemAdmin/UserAccess");
//setups
var ExecutiveReports=require("./Routes/Reports/ExecutiveReports");
var CustomReport = require("./Routes/Reports/CustomReport");
var TravelledReport= require("./Routes/Reports/TravelledReport");
var EmailVerification = require("./Routes/SystemAdmin/EmailVerification");
var ResetPassword = require("./Routes/SystemAdmin/ResetPassword");
var sms = require("./Routes/SMS/sms");
var Dashboard = require("./Routes/Applications/Dashboard");
var TotalUsers=require("./Routes/Reports/TotalUsers");
var TotalCost=require("./Routes/Reports/TotalCost");
var counties = require("./Routes/SetUps/counties");
var countries=require("./Routes/SetUps/countries");
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
app.use("/api/Uploads", Uploads);
// app.use("/api/upload", Uploadfiles);
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
app.use("/api/DCI",DCI);
app.use("/api/Passport",Passport);
app.use("/api/Educational",Educational);
app.use("/api/Parent",Parent);
app.use("/api/NextOFKin",NextOFKin);
app.use("/api/Siblings",Siblings);
app.use("/api/Contract",Contract);
app.use("/api/Training",Training),
app.use("/api/Major",Major);
app.use("/api/NEAA",NEAA);
app.use("/api/Visa",Visa);
app.use("/api/Attestation",Attestation);
app.use("/api/Ticketing",Ticketing);
app.use("/api/Final",Final);
app.use("/api/TotalCost",TotalCost);
//reports
app.use("/api/ExecutiveReports", ExecutiveReports);
app.use("/api/CustomReport", CustomReport);
app.use("/api/Travelling",Travelling);
app.use("/api/auditrails", Auditrails);
app.use("/api/UserAccess", UserAccess);
app.use("/api/GroupAccess", GroupAccess);
app.use("/api/configurations", configurations);
app.use("/api/Dashboard", Dashboard);
app.use("/api/TravelledReport",TravelledReport);
app.use("/api/TotalUsers",TotalUsers);
app.use("/api/counties",counties);
app.use("/api/countries",countries)
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
