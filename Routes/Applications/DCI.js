var express = require("express");
var DCI = express();
var mysql = require("mysql");
var config = require("./../../DB");
var Joi = require("joi");
var con = mysql.createPool(config);
var auth = require("./../../auth");
DCI.get("/", function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getDCI()";
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
DCI.get("/:ID", auth.validateRole("DCI Clearance"), function(
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
      let sp = "call getOneDCI(?)";
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
DCI.post("/", auth.validateRole("DCI Clearance"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    DOT:Joi.date().required(),
    Certificate_status: Joi.string().required(),
    DOC:Joi.date().required(),
    Cost: Joi.string().allow(null).allow(""),
    CostIncurred:Joi.string().allow(null).allow(""),
      Processing:Joi.string().allow(null).allow(""),
  
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [req.body.Number,req.body.DOT,req.body.Certificate_status,req.body.DOC,req.body.Cost,
      req.body.CostIncurred,req.body.Processing, res.locals.user];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call SaveDCI(?,?,?,?,?,?,?,?)";
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
DCI.put("/:ID", auth.validateRole("DCI Clearance"), function (req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    DOT:Joi.date().required(),
    Certificate_status: Joi.string().required(),
    DOC:Joi.date().required(),
    Cost: Joi.string().allow(null).allow(""),
    CostIncurred:Joi.string().allow(null).allow(""),
    Processing:Joi.string().allow(null).allow(""),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    const ID = req.params.ID;
    let data = [
      req.body.Number,req.body.DOT,req.body.Certificate_status,req.body.DOC,req.body.Cost,
      req.body.CostIncurred,req.body.Processing,
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
        let sp = "call UpdateDCI(?,?,?,?,?,?,?,?,?)";
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
DCI.delete("/:ID", auth.validateRole("DCI Clearance"), function(
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
      let sp = "call DeleteDCI(?,?)";
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
module.exports = DCI;
