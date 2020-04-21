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
var MinorMedicalReport=require("./Routes/Reports/MinorMedicalReport");
var DCIReport=require("./Routes/Reports/DCIReport");
var PassportReport=require("./Routes/Reports/PassportReport");
var MinorCost=require("./Routes/FinacialReport/MinorCost");
var DCICost=require("./Routes/FinacialReport/DCICost");
var PassportCost=require("./Routes/FinacialReport/PassportCost");
var MajorCost=require("./Routes/FinacialReport/MajorCost");
var TicketingCost=require("./Routes/FinacialReport/TicketingCost");
var FinalCost=require("./Routes/FinacialReport/FinalCost");
var TotalCostIncurred=require("./Routes/FinacialReport/TotalCostIncurred");
//redAlerts
var MinorRedAlerts=require("./Routes/RedAlerts/MinorRedAlerts");
var DCIRedAlerts=require("./Routes/RedAlerts/DCIRedAlerts");
var PassportRedAlerts=require("./Routes/RedAlerts/PassportRedAlerts");
var TrainingRedAlerts=require("./Routes/RedAlerts/TrainingRedAlerts");
var MajorRedAlerts=require("./Routes/RedAlerts/MajorRedAlerts");
var ContractRedAlerts= require("./Routes/RedAlerts/ContractRedAlerts");
var NEARedAlerts=require("./Routes/RedAlerts/NEARedAlerts");
var VisaRedAlerts=require("./Routes/RedAlerts/VisaRedAlerts");
var TicketingRedAlerts=require("./Routes/RedAlerts/TicketingRedAlerts");
var AttestationRedAlert=require("./Routes/RedAlerts/AttestationRedAlert");
var FinalRedAlerts=require("./Routes/RedAlerts/FinalRedAlerts");
var TravelledApplicant=require("./Routes/RedAlerts/TravelledApplicant");
var RegistrationCustom=require("./Routes/CustomReports/RegistrationCustom");
var TrainingCustom =require("./Routes/CustomReports/TrainingCustom");
var DCICustom =require("./Routes/CustomReports/DCICustom");
var PassportCustom =require("./Routes/CustomReports/PassportCustom");
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
app.use("/api/ExecutiveReports", ExecutiveReports);
app.use("/api/CustomReport", CustomReport);
app.use("/api/Travelling",Travelling);
app.use("/api/auditrails", Auditrails);
app.use("/api/UserAccess", UserAccess);
app.use("/api/GroupAccess", GroupAccess);
app.use("/api/configurations", configurations);
app.use("/api/Dashboard", Dashboard);
app.use("/api/TravelledReport",TravelledReport);
app.use("/api/MinorMedicalReport",MinorMedicalReport);
app.use("/api/DCIReport",DCIReport);
app.use("/api/PassportReport",PassportReport);
app.use("/api/MinorCost",MinorCost);
app.use("/api/TotalUsers",TotalUsers);
app.use("/api/counties",counties);
app.use("/api/countries",countries);
app.use("/api/DCICost",DCICost);
app.use("/api/PassportCost",PassportCost);
app.use("/api/MajorCost",MajorCost);
app.use("/api/TicketingCost",TicketingCost);
app.use("/api/FinalCost",FinalCost);
app.use("/api/TotalCostIncurred",TotalCostIncurred);
//redalerts
app.use("/api/MinorRedAlerts",MinorRedAlerts);
app.use("/api/MajorRedAlerts",MajorRedAlerts);
app.use("/api/DCIRedAlerts",DCIRedAlerts);
app.use("/api/PassportRedAlerts",PassportRedAlerts);
app.use("/api/TrainingRedAlerts",TrainingRedAlerts);
app.use("/api/ContractRedAlerts",ContractRedAlerts);
app.use("/api/NEARedAlerts",NEARedAlerts);
app.use("/api/VisaRedAlerts",VisaRedAlerts);
app.use("/api/AttestationRedAlert",AttestationRedAlert);
app.use("/api/TicketingRedAlerts",TicketingRedAlerts);
app.use("/api/FinalRedAlerts",FinalRedAlerts);
app.use("/api/TravelledApplicant",TravelledApplicant);
app.use("/api/RegistrationCustom",RegistrationCustom);
app.use("/api/TrainingCustom",TrainingCustom);
app.use("/api/DCICustom",DCICustom);
app.use("/api/PassportCustom",PassportCustom);
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
