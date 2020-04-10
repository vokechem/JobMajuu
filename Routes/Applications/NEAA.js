var express = require("express");
var NEAA = express();
var mysql = require("mysql");
var config = require("../../DB");
var con = mysql.createPool(config);
var Joi = require("joi");
var auth = require("../../auth");
NEAA.get("/", auth.validateRole("NEAA"), function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetNEAA()";
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
NEAA.get("/:ID", auth.validateRole("NEAA"), function(req, res) {
  const ID = req.params.ID;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetOneNEAA(?)";
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
NEAA.post("/", auth.validateRole("NEAA"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    DOS:Joi.date().required(),
    Approved_Status: Joi.string().required(),
    DOA:Joi.date().required(),
    Reason: Joi.string(),
    RDate:Joi.date(),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [
      req.body.Number,
      req.body.DOS,
      req.body.Approved_Status,
      req.body.DOA,
      req.body.Reason,
      req.body.RDate,
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
        let sp = "call SaveNEAA(?,?,?,?,?,?,?)";
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
NEAA.put("/:ID", auth.validateRole("NEAA"), function (req, res) {
    const schema = Joi.object().keys({
        Number:Joi.number().integer().min(1),
        DOS:Joi.date().required(),
        Approved_Status: Joi.string().required(),
        DOA:Joi.date().required(),
        Reason: Joi.string(),
        RDate:Joi.date(),
    });
    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      const ID = req.params.ID;
      let data = [
        req.body.Number,
        req.body.DOS,
        req.body.Approved_Status,
        req.body.DOA,
        req.body.Reason,
        req.body.RDate,
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
          let sp = "call UpdateNEAA(?,?,?,?,?,?,?,?)";
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
NEAA.delete("/:ID", auth.validateRole("NEAA"), function(req, res) {
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
      let sp = "call DeleteNEAA(?,?)";
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
module.exports = NEAA;
