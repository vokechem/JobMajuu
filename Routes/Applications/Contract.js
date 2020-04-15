var express = require("express");
var Contract = express();
var mysql = require("mysql");
var config = require("./../../DB");
var Joi = require("joi");
var con = mysql.createPool(config);
var auth = require("./../../auth");
Contract.get("/", function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getContract()";
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
Contract.get("/:ID", auth.validateRole("Contract Processing"), function (req, res) {
  const ID = req.params.ID;
  con.getConnection(function (err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call getOneContract(?)";
      connection.query(sp, [ID], function (error, results, fields) {
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
Contract.post("/", auth.validateRole("Contract Processing"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    Contract_status: Joi.string().required(),
    Cost: Joi.string().required(),
    EmployerName:Joi.string().required(),
  EmployerID:Joi.string().allow(null).allow(""),
  EmployerContact:Joi.string().allow(null).allow(""),
  EmployerAddress:Joi.string().allow(null).allow(""),
  VisaNumber:Joi.string().allow(null).allow(""),
  ContractNumber:Joi.string().allow(null).allow(""),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [    req.body.Number,
        req.body.Contract_status,
        req.body.Cost,
        req.body.EmployerName,
        req.body.EmployerID,
        req.body.EmployerContact,
        req.body.EmployerAddress,
        req.body.VisaNumber,
        req.body.ContractNumber,
        res.locals.user];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call SaveContract(?,?,?,?,?,?,?,?,?,?)";
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
Contract.put("/:ID", auth.validateRole("Contract Processing"), function (req, res) {
  const schema = Joi.object().keys({
      Number:Joi.number().integer().min(1),
      Contract_status: Joi.string().required(),
      Cost: Joi.string().required(),
      EmployerName:Joi.string().required(),
      EmployerID:Joi.string().allow(null).allow(""),
      EmployerContact:Joi.string().allow(null).allow(""),
      EmployerAddress:Joi.string().allow(null).allow(""),
      VisaNumber:Joi.string().allow(null).allow(""),
      ContractNumber:Joi.string().allow(null).allow(""),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    const ID = req.params.ID;
    let data = [
        req.body.Number,
        req.body.Contract_status,
        req.body.Cost,
        req.body.EmployerName,
        req.body.EmployerID,
        req.body.EmployerContact,
        req.body.EmployerAddress,
        req.body.VisaNumber,
        req.body.ContractNumber,
        res.locals.user,
        ID,
      ];
   
    con.getConnection(function (err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call UpdateContract(?,?,?,?,?,?,?,?,?,?,?)";
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

Contract.delete("/:ID", auth.validateRole("Contract Processing"), function(
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
      let sp = "call DeleteContract(?,?)";
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
module.exports = Contract;
