var express = require("express");
var Ticketing = express();
var mysql = require("mysql");
var config = require("../../DB");
var con = mysql.createPool(config);
var Joi = require("joi");
var auth = require("../../auth");
Ticketing.get("/", auth.validateRole("Ticketing"), function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetTicketing()";
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
Ticketing.get("/:ID", auth.validateRole("Ticketing"), function(req, res) {
  const ID = req.params.ID;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetOneTicketing(?)";
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
Ticketing.post("/", auth.validateRole("Ticketing"), function(req, res) {
  const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    Ticket_status: Joi.string().required(),
    Flight_Date:Joi.date().required(),
    Destination: Joi.string().required(),
    Airline: Joi.string().required(),
    Cost: Joi.string().required(),
  });
  const result = Joi.validate(req.body, schema);
  if (!result.error) {
    let data = [
      req.body.Number,
      req.body.Ticket_status,
      req.body.Flight_Date,
      req.body.Destination,
      req.body.Airline,
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
        let sp = "call SaveTicketing(?,?,?,?,?,?,?)";
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
Ticketing.put("/:ID", auth.validateRole("Ticketing"), function (req, res) {
    const schema = Joi.object().keys({
    Number:Joi.number().integer().min(1),
    Ticket_status: Joi.string().required(),
    Flight_Date:Joi.date().required(),
    Destination: Joi.string().required(),
    Airline: Joi.string().required(),
    Cost: Joi.string().required(),
    });
    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      const ID = req.params.ID;
      let data = [
        req.body.Number,
        req.body.Ticket_status,
        req.body.Flight_Date,
        req.body.Destination,
        req.body.Airline,
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
          let sp = "call UpdateTicketing(?,?,?,?,?,?,?,?)";
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
Ticketing.delete("/:ID", auth.validateRole("Ticketing"), function(req, res) {
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
      let sp = "call DeleteTicketing(?,?)";
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
module.exports = Ticketing;
