var express = require("express");
var Dashboard = express();
var mysql = require("mysql");
var config = require("./../../DB");

var con = mysql.createPool(config);
var auth = require("./../../auth");
Dashboard.get("/", auth.validateRole("Dashboard"), function(req, res) {
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      let sp = "call GetTotalApplcicants()";
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
// Dashboard.get("/", auth.validateRole("Dashboard"), function(req, res) {
//   con.getConnection(function(err, connection) {
//     if (err) {
//       res.json({
//         success: false,
//         message: err.message
//       });
//     } // not connected!
//     else {
//       let sp = "call GetAllgroundsandrequestedorders()";
//       connection.query(sp, function(error, results, fields) {
//         if (error) {
//           res.json({
//             success: false,
//             message: error.message
//           });
//         } else {
//           res.json(results[0]);
//         }
//         connection.release();
//         // Don't use the connection here, it has been returned to the pool.
//       });
//     }
//   });
// });

Dashboard.get("/:Value", auth.validateRole("Dashboard"), function(
  req,
  res
) {
  const Value = req.params.Value;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      if (Value === "1") {
        let sp = "call GetTotalApplcicants(?)";
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
      } else {
        let sp = "call GetTotalApplcicants(?)";
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
    }
  });
});
Dashboard.get("/:Value", auth.validateRole("Dashboard"), function(
  req,
  res
) {
  const Value = req.params.Value;
  con.getConnection(function(err, connection) {
    if (err) {
      res.json({
        success: false,
        message: err.message
      });
    } // not connected!
    else {
      if (Value === "1") {
        let sp = "call TotalSystemUsers(?)";
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
      } else {
        let sp = "call TotalSystemUsers(?)";
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
    }
  });
});
module.exports = Dashboard;
