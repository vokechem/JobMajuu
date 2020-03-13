var express = require("express");
var Registration = express();
var mysql = require("mysql");
var config = require("../../DB");
var con = mysql.createPool(config);
var Joi = require("joi");
var auth = require("../../auth");
Registration.get("/", auth.validateRole("Registration"), function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetTodayRegistration()";
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
Registration.get("/:ID", auth.validateRole("Registration"), function(
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
      let sp = "call getOneRegistration(?)";
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
Registration.post("/", auth.validateRole("Registration"), function(req, res) {
  let data = [req.body.Name, req.body.Description, res.locals.user];
  const schema = Joi.object().keys({
    FullName: Joi.string().min(3).required(),
      IDNumber: Joi.string().min(3).required(),
      Gender: Joi.string().min(1).required(),
      Phone: Joi.string().min(3).required(),
      Email: Joi.string().min(3).required(),
      DOB:Joi.date().required(), 
      KinName: Joi.string().min(3).required(),
      KinIDNO: Joi.string().min(3).required(),
      GuardianName: Joi.string().min(3).required(),
      GuardianPhone: Joi.string().min(3).required(),
      GuardianIDNO: Joi.string().min(3).required(),
      Photo: Joi.string(),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [
      req.body.FullName,
      req.body.IDNumber,
      req.body.Gender,
      req.body.Email,
      req.body.Phone,
      req.body.DOB,
      req.body.KinName,
      req.body.KinIDNO,
      req.body.GuardianName,
      req.body.GuardianPhone,
      req.body.GuardianIDNO,
      res.locals.user,
      req.body.Photo,
      req.body.Passport
    ];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call SaveRegistration(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
Registration.put("/:ID", auth.validateRole("Registration"), function(
  req,
  res
) {
  const schema = Joi.object().keys({
    FullName: Joi.string().min(3).required(),
    IDNumber: Joi.string().min(3).required(),
    Gender: Joi.string().min(1).required(),
    Phone: Joi.string().min(3).required(),
    Email: Joi.string().min(3).required(),
    DOB:Joi.date().required(), 
    KinName: Joi.string().min(3).required(),
    KinIDNO: Joi.string().min(3).required(),
    GuardianName: Joi.string().min(3).required(),
    GuardianPhone: Joi.string().min(3).required(),
    GuardianIDNO: Joi.string().min(3).required(),
    status: Joi.boolean(),
    Photo: Joi.string(),
    Passport: Joi.boolean()
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    const ID = req.params.ID;
    let data = [
      req.body.FullName,
      req.body.IDNumber,
      req.body.Gender,
      req.body.Email,
      req.body.Phone,
      req.body.DOB,
      req.body.KinName,
      req.body.KinIDNO,
      req.body.GuardianName,
      req.body.GuardianPhone,
      req.body.GuardianIDNO,
      req.body.status,
      req.body.Photo,
      req.body.Passport,
      ID, 
      res.locals.user];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call UpdateRegistration(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        connection.query(sp, data, function(error, results, fields) {
          if (error) {
            res.json({
              success: false,
              message: error.message
            });
          } else {
            res.json({
              success: true,
              message: "Updated"
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
Registration.delete("/:ID", auth.validateRole("Registration"), function(
  req,
  res
) {
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
      let sp = "call DeleteRegistration(?,?)";
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
module.exports = Registration;
