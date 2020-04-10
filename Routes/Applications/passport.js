var express = require("express");
var Passport = express();
var mysql = require("mysql");
var config = require("../../DB");
var con = mysql.createPool(config);
var Joi = require("joi");
var auth = require("../../auth");
Passport.get("/", auth.validateRole("Passport processing"), function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getpassport()";
      connection.query(sp, function(error, results, fields) {
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
  });
});
Passport.get("/:ID", auth.validateRole("Passport processing"), function(req, res) {
  const ID = req.params.ID;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getOnepassport(?)";
      connection.query(sp, ID, function(error, results, fields) {
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
  });
});
Passport.post("/", auth.validateRole("Passport processing"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    POD:Joi.date().required(),
    Tracking_Number: Joi.string().required(),
    Status:Joi.string().required(),
    Cost: Joi.string().required(),
    Passport_Collection_Date:Joi.date().required(),
    PassPortNumber:Joi.string().required(),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [
      req.body.Number,
      req.body.POD,
      req.body.Tracking_Number,
      req.body.Status,
      req.body.Passport_Collection_Date,
      req.body.PassPortNumber,
      req.body.Cost,
      res.locals.user,
  
    ];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call SavePassport(?,?,?,?,?,?,?,?)";
        connection.query(sp, data, function(error, results, fields) {
          if (error) {
            res.json({
              success: false,
              message: error.message
            });
          } else {
            res.json({
              success: true,
              message: "saved"
            });
          }
          connection.release();
          // Don't use the connection here, it has been returned to the pool.
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: result.error.details[0].message
    });
  }
});
Passport.put("/:ID", auth.validateRole("Passport processing"), function (req, res) {
    const schema = Joi.object().keys({
        Number:Joi.number().integer().min(1),
        POD:Joi.date().required(),
        Tracking_Number: Joi.string().required(),
        Status:Joi.string().required(),
        Cost: Joi.string().required(),
        Passport_Collection_Date:Joi.date().required(),
        PassPortNumber:Joi.string().required(),
    });
    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      const ID = req.params.ID;
      let data = [
        req.body.Number,
        req.body.POD,
        req.body.Tracking_Number,
        req.body.Status,
        req.body.Passport_Collection_Date,
        req.body.PassPortNumber,
        req.body.Cost,
        res.locals.user,
        ID 
      ];
      con.getConnection(function (err, connection) {
        if (err) {
          res.json({
            success: false,
            message: err.message
          });
        } // not connected!
        else {
          let sp = "call UpdatePassport(?,?,?,?,?,?,?,?,?)";
          connection.query(sp, data, function (error, results, fields) {
            if (error) {
              res.json({
                success: false,
                message: error.message
              });
            } else {
              res.json({
                success: true,
                message: "updated successfully"
              });
            }
            connection.release();
            // Don't use the connection here, it has been returned to the pool.
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: result.error.details[0].message
      });
    }
  });
Passport.delete("/:ID", auth.validateRole("Passport processing"), function(req, res) {
  const ID = req.params.ID;
  let data = [ID, res.locals.user];

  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call DeletePassport(?,?)";
      connection.query(sp, data, function(error, results, fields) {
        if (error) {
          res.json({
            success: false,
            message: error.message
          });
        } else {
          res.json({
            success: true,
            message: "Deleted Successfully"
          });
        }
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
      });
    }
  });
});
module.exports = Passport;
