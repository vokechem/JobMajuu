var express = require("express");
var Minor = express();
var mysql = require("mysql");
var config = require("./../../DB");
var Joi = require("joi");
var con = mysql.createPool(config);
var auth = require("./../../auth");
Minor.get("/", function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getMinorMedical()";
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
Minor.get("/:ID", auth.validateRole("Minor Medical"), function(
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
      let sp = "call GetOneMinorMedical(?)";
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
Minor.post("/", auth.validateRole("Minor Medical"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number()
    .integer()
    .min(1),
      DOM:Joi.date().required(),
      MedicalFacility: Joi.string().required(),
      Result: Joi.string().required(),
      Cost: Joi.string().required(),
      Type:Joi.string().allow(null).allow(""),
      RepeatCost:Joi.string().allow(null).allow(""),
      Others:Joi.string().allow(null).allow(""),
    
  
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [ req.body.Number,req.body.DOM,req.body.MedicalFacility,req.body.Result,req.body.Cost,req.body.Type,req.body.RepeatCost,
      req.body.Others,
      res.locals.user];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call SaveMinorMedical(?,?,?,?,?,?,?,?,?)";
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
Minor.put("/:ID", auth.validateRole("Minor Medical"), function (req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number()
    .integer()
    .min(1),
      DOM:Joi.date().required(),
      MedicalFacility: Joi.string().required(),
      Result: Joi.string().required(),
      Cost: Joi.string().required(),
      Type:Joi.string().allow(null).allow(""),
      RepeatCost:Joi.string().allow(null).allow(""),
      Others:Joi.string().allow(null).allow(""),
     

  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    const ID = req.params.ID;
    let data = [
      req.body.Number,req.body.DOM,req.body.MedicalFacility,req.body.Result,req.body.Cost,req.body.Type,req.body.RepeatCost,
      req.body.Others,
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
        let sp = "call UpdateMinorMedical(?,?,?,?,?,?,?,?,?,?)";
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
Minor.delete("/:ID", auth.validateRole("Minor Medical"), function(
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
      let sp = "call DeleteMinorMedical(?,?)";
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
module.exports = Minor;
