var express = require("express");
var Major = express();
var mysql = require("mysql");
var config = require("./../../DB");
var Joi = require("joi");
var con = mysql.createPool(config);
var auth = require("./../../auth");
Major.get("/", function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getMajormedical()";
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
Major.get("/:ID", auth.validateRole("Major Medical"), function(
  req,
  res
) {
  const ID = req.params.ID;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getOneMajormedical(?)";
      connection.query(sp, [ID], function(error, results, fields) {
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
Major.post("/", auth.validateRole("Major Medical"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    MedicalFacility:Joi.string().required(),
    MedicalResults:Joi.string().required(),
      DOM:Joi.date().required(),
      MCertificate: Joi.string().required(),
      DOC: Joi.date().required(),
      Cost: Joi.string().required(),
      Type:Joi.string().required(),
      RepeatCost:Joi.string().allow(null).allow(""),
      Other:Joi.string().allow(null).allow(""), 
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [req.body.Number,req.body.MedicalFacility,req.body.MedicalResults,
        req.body.DOM,req.body.MCertificate,req.body.DOC,req.body.Cost,req.body.Type,req.body.RepeatCost,req.body.Other, res.locals.user];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call SaveMajor(?,?,?,?,?,?,?,?,?,?,?)";
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
Major.put("/:ID", auth.validateRole("Major Medical"), function (req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    MedicalFacility:Joi.string().required(),
    MedicalResults:Joi.string().required(),
      DOM:Joi.date().required(),
      MCertificate: Joi.string().required(),
      DOC: Joi.date().required(),
      Cost: Joi.string().required(),
      Type:Joi.string().required(),
      RepeatCost:Joi.string().allow(null).allow(""),
      Other:Joi.string().allow(null).allow(""), 
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    const ID = req.params.ID;
    let data = [
        req.body.Number,req.body.MedicalFacility,req.body.MedicalResults,
        req.body.DOM,req.body.MCertificate,req.body.DOC,req.body.Cost,
        req.body.Type,req.body.RepeatCost,req.body.Other,
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
        let sp = "call UpdateMajor(?,?,?,?,?,?,?,?,?,?,?,?)";
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
Major.delete("/:ID", auth.validateRole("Major Medical"), function(
  req,
  res
) {
  const ID = req.params.ID;

  let data = [ID,res.locals.user];
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call DeleteMajorMedical(?,?)";
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
module.exports = Major;
