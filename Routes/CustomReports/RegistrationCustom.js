var express = require("express");
var RegistrationCustom = express();
var mysql = require("mysql");
var config = require("./../../DB");
var Joi = require("joi");
var con = mysql.createPool(config);
var auth = require("./../../auth");

// requests handled
RegistrationCustom.get("/:ID/:Val1/:Val2/:Val3", function(req, res) {
  const ID = req.params.ID;
  const Val1 = req.params.Val1;
  const Val2 = req.params.Val2;
  const Val3 = req.params.Val3;

  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      if (Val3 === "registration") {
        let sp = "call GenerateRegistrationDaily(?,?,?)";
        connection.query(sp, [ID, Val1, Val2], function(
          error,
          results,
          fields
        ) {
          if (error) {
            res.json({
              success: false,
              message: error.message
            });
          } else {
            res.json(results[0]);
          }
          connection.release();
          // Don't use the connection here, it has been returned to the pool.
        });
      } else {
        {
          let sp = "call GetsuccessfullApplications(?,?,?,?)";
          connection.query(sp, [ID, Val1, Val2, Val3], function(
            error,
            results,
            fields
          ) {
            if (error) {
              res.json({
                success: false,
                message: error.message
              });
            } else {
              res.json(results[0]);
            }
            connection.release();
            // Don't use the connection here, it has been returned to the pool.
          });
        }
      }
    }
  });
});
module.exports = RegistrationCustom;
