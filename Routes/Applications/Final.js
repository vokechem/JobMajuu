var express = require("express");
var Final = express();
var mysql = require("mysql");
var config = require("../../DB");
var con = mysql.createPool(config);
var Joi = require("joi");
var auth = require("../../auth");
Final.get("/", auth.validateRole("Final Medical"), function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getFinalmedical()";
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
Final.get("/:ID", auth.validateRole("Final Medical"), function(req, res) {
  const ID = req.params.ID;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getOneFinalmedical(?)";
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
Final.post("/", auth.validateRole("Final Medical"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    MedicalFacility: Joi.string().required(),
    DOM:Joi.date().required(),
    MedicalResult: Joi.string().required(),
    Cost:Joi.string().required(),
    Type:Joi.string().allow(null).allow(""),
    RepeatCost:Joi.string().allow(null).allow(""),
    Other:Joi.string().allow(null).allow(""),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [
      req.body.Number,
      req.body.MedicalFacility,
      req.body.DOM,
      req.body.MedicalResult,
      req.body.Cost,
      req.body.Type,
      req.body.RepeatCost,
      req.body.Other,
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
        let sp = "call SaveFinalMedical(?,?,?,?,?,?,?,?,?)";
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
Final.put("/:ID", auth.validateRole("Final Medical"), function (req, res) {
    const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    MedicalFacility: Joi.string().required(),
    DOM:Joi.date().required(),
    MedicalResult: Joi.string().required(),
    Cost:Joi.string().required(),
    Type:Joi.string().allow(null).allow(""),
    RepeatCost:Joi.string().allow(null).allow(""),
    Other:Joi.string().allow(null).allow(""),
    });
    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      const ID = req.params.ID;
      let data = [
        req.body.Number,
      req.body.MedicalFacility,
      req.body.DOM,
      req.body.MedicalResult,
      req.body.Cost,
      req.body.Type,
      req.body.RepeatCost,
      req.body.Other,
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
          let sp = "call UpdateFinalMedical(?,?,?,?,?,?,?,?,?,?)";
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
Final.delete("/:ID", auth.validateRole("Final Medical"), function(req, res) {
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
      let sp = "call DeleteFinalMedical(?,?)";
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
module.exports = Final;
