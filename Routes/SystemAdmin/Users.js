var express = require("express");
var Users = express();
var mysql = require("mysql");
var config = require("../../DB");
var con = mysql.createPool(config);
const bcrypt = require("bcryptjs");
var Joi = require("joi");
var randomstring = require("randomstring");
var auth = require("../../auth");
Users.get("/", auth.validateRole("System Users"), function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetUsers()";
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


Users.get("/:ID", auth.validateRole("System Users"), function(req, res) {
  const ID = req.params.ID;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetUser(?)";
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

Users.post("/", auth.validateRole("System Users"), function(req, res) {
  const schema = Joi.object().keys({
    Name: Joi.string()
      .min(3)
      .required(),
    Phone: Joi.string()
      .min(10)
      .required(),
    UserGroup: Joi.number()
      .integer()
      .min(1),
    Username: Joi.string()
      .min(3)
      .required(),
    Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    Email: Joi.string().email({ minDomainAtoms: 2 }),
    Signature: Joi.string()
      .allow(null)
      .allow(""),
    IDnumber: Joi.string().required(),
    DOB: Joi.date().required(),
    Gender: Joi.string()
      .allow(null)
      .allow(""),
    IsActive: Joi.boolean(),
    Board: Joi.boolean()
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    bcrypt.hash(req.body.Password, 10, function(err, hash) {
      if (err) {
        return res.json({
          success: false,
          message: "failed to bcyrpt the password"
        });
      }
      let activationCode = randomstring.generate(5);
      let data = [
        req.body.Name,
        req.body.Email,
        hash,
        req.body.UserGroup,
        req.body.Username,
        res.locals.user,
        req.body.Phone,
        req.body.Signature,
        req.body.IsActive,
        req.body.IDnumber,
        req.body.DOB,
        req.body.Gender,
        activationCode,
        req.body.Board
      ];
      con.getConnection(function(err, connection) {
        if (err) {
          res.json({
            success: false,
            message: err.message
          });
        } // not connected!
        else {
          let sp = "call SaveUser(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
    });
  } else {
    res.json({
      success: false,
      message: result.error.details[0].message
    });
  }
});
Users.put("/:ID", auth.validateRole("System Users"), function(req, res) {
  const schema = Joi.object().keys({
    Name: Joi.string()
      .min(3)
      .required(),
    Phone: Joi.string()
      .min(10)
      .required(),
    UserGroup: Joi.number()
      .integer()
      .min(1),
    Username: Joi.string()
      .min(3)
      .required(),
    Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    Email: Joi.string().email({ minDomainAtoms: 2 }),
    Signature: Joi.string()
      .allow(null)
      .allow(""),
    IsActive: Joi.boolean(),
    IDnumber: Joi.string().required(),
    Board: Joi.boolean(),
    DOB: Joi.date().required(),
    Gender: Joi.string()
      .allow(null)
      .allow("")
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    const ID = req.params.ID;
    let data = [
      req.body.Name,
      req.body.Email,
      req.body.UserGroup,
      ID,
      req.body.IsActive,
      res.locals.user,
      req.body.Phone,
      req.body.Signature,
      req.body.IDnumber,
      req.body.DOB,
      req.body.Gender,
      req.body.Board
    ];
    con.getConnection(function(err, connection) {
      if (err) {
        res.json({
          success: false,
          message: err.message
        });
      } // not connected!
      else {
        let sp = "call UpdateUser(?,?,?,?,?,?,?,?,?,?,?,?)";
        connection.query(sp, data, function(error, results, fields) {
          if (error) {
            res.json({
              success: false,
              message: error.message
            });
          } else {
            res.json({
              success: true,
              message: "updated"
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
Users.delete("/:ID", auth.validateRole("System Users"), function(req, res) {
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
      let sp = "call Deleteuser(?,?)";
      connection.query(sp, data, function(error, results, fields) {
        if (error) {
          res.json({
            success: false,
            message: error.message
          });
        } else {
          res.json({
            success: true,
            message: "deleted Successfully"
          });
        }
        connection.release();
        // Don't use the connection here, it has been returned to the pool.
      });
    }
  });
});
module.exports = Users;
