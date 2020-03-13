const express = require("express");
var mysql = require("mysql");
var config = require("../../DB");

var con = mysql.createPool(config);
const confirmation = express.Router();
confirmation.get("/", (req, res) => {
  res.json({
    success: false,
    message: " err.message"
  });
});
confirmation.post("/", (req, res) => {
  let data = [
    req.body.TransactionType,
    req.body.TransID,
    req.body.TransTime,
    req.body.TransAmount,
    req.body.BusinessShortCode,
    req.body.BillRefNumber,
    req.body.InvoiceNumber,
    req.body.OrgAccountBalance,
    req.body.ThirdPartyTransID,
    req.body.MSISDN,
    req.body.FirstName,
    req.body.MiddleName,
    req.body.LastName
  ];
  con.getConnection(function(err, connection) {
    if (err) {
      // res.json({
      //   success: false,
      //   message: err.message
      // });
    } // not connected!
    else {
      let sp = "call SaveMpesaTransactions(?,?,?,?,?,?,?,?,?,?,?,?,?)";
      connection.query(sp, data, function(error, results, fields) {
        if (error) {
          console.log(error.message);
          // res.json({
          //   success: false,
          //   message: error.message
          // });
        } else {
          res.json({
            ResultCode: 0,
            ResultDesc: "success",
            ThirdPartyTransID: 0
          });
        }
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
      });
    }
  });
});
module.exports = confirmation;
