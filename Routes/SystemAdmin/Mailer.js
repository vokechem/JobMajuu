var express = require("express");
var Mailer = express();
var mysql = require("mysql");
var config = require("./../../DB");
var con = mysql.createPool(config);
let nodeMailer = require("nodemailer");
function SendResetPasswordmail(Destination, Subject, emailbody) {
  const output = `<p>Your New password is: <b>${emailbody}</b></p>`;
  con.getConnection(function(err, connection) {
    let sp = "call getSMTPDetails()";
    connection.query(sp, function(error, results, fields) {
      if (error) {
        res.json({
          success: false,
          message: error.message
        });
      } else {
        let Host = results[0][0].Host;
        let Port = results[0][0].Port;
        let Sender = results[0][0].Sender;
        let Password = results[0][0].Password;

        let transporter = nodeMailer.createTransport({
          host: Host,
          port: Port,
          secure: true,
          auth: {
            // should be replaced with real sender's account
            user: Sender,
            pass: Password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        let mailOptions = {
          // should be replaced with real recipient's account
          to: Destination,
          subject: Subject,
          html: output
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return false;
          } else {
            return true;
          }
        });
      }
      connection.release();
    });
  });
}
function SendPEAcknowledgement(Destination, Subject, emailbody) {
  const output = `<p>Your Activation Code is :<b>${emailbody}</b></p>`;
  con.getConnection(function(err, connection) {
    let sp = "call getSMTPDetails()";
    connection.query(sp, function(error, results, fields) {
      if (error) {
        res.json({
          success: false,
          message: error.message
        });
      } else {
        let Host = results[0][0].Host;
        let Port = results[0][0].Port;
        let Sender = results[0][0].Sender;
        let Password = results[0][0].Password;

        let transporter = nodeMailer.createTransport({
          host: Host,
          port: Port,
          secure: true,
          auth: {
            // should be replaced with real sender's account
            user: Sender,
            pass: Password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        let mailOptions = {
          // should be replaced with real recipient's account
          to: Destination,
          subject: Subject,
          html: output
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return false;
          } else {
            return true;
          }
        });
      }
      connection.release();
    });
  });
}
Mailer.post("/:ID", function(req, res) {
  try {
    const ID = req.params.ID;
    if (ID === "EmailVerification") {
      const output = `<p>Your Activation Code is:<b>${req.body.activationCode}</b></p>`;
      con.getConnection(function(err, connection) {
        let sp = "call getSMTPDetails()";
        connection.query(sp, function(error, results, fields) {
          if (error) {
            res.json({
              success: false,
              message: error.message
            });
          } else {
            let Host = results[0][0].Host;
            let Port = results[0][0].Port;
            let Sender = results[0][0].Sender;
            let Password = results[0][0].Password;

            let transporter = nodeMailer.createTransport({
              host: Host,
              port: Port,
              secure: true,
              auth: {
                // should be replaced with real sender's account
                user: Sender,
                pass: Password
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            let mailOptions = {
              to: req.body.to,
              subject: req.body.subject,
              html: output
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Not Sent"
                });
              } else {
                res.json({
                  success: true,
                  message: "Sent"
                });
              }
            });
          }
          connection.release();
        });
      });
    }

    if (ID == "CreatAccount") {
      const output = `<p>Thank you <b>${req.body.name}</b> for creating an account with ARCMS.</p>
        <p>Your UserName is:<b>${req.body.Username}</b> and Your Activation Code is:<b>${req.body.activationCode}</b>.</p>`;
      con.getConnection(function(err, connection) {
        let sp = "call getSMTPDetails()";
        connection.query(sp, function(error, results, fields) {
          if (error) {
            res.json({
              success: false,
              message: error.message
            });
          } else {
            let Host = results[0][0].Host;
            let Port = results[0][0].Port;
            let Sender = results[0][0].Sender;
            let Password = results[0][0].Password;

            let transporter = nodeMailer.createTransport({
              host: Host,
              port: Port,
              secure: true,
              auth: {
                // should be replaced with real sender's account
                user: Sender,
                pass: Password
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            let mailOptions = {
              to: req.body.to,
              subject: req.body.subject,
              html: output
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Not Sent"
                });
              } else {
                res.json({
                  success: true,
                  message: "Sent"
                });
              }
            });
          }
          connection.release();
        });
      });
    }

    if (ID == "PEAcknowledgement") {
      const output = `<p>This is to confirm the Acknowledgement of a request to respond to
     Application: <b>${req.body.ApplicationNo}</b> ;<b>${req.body.Applicant}</b> VS <b>${req.body.PE}</b> with respect 
     to Tender No: <b>${req.body.TenderNO}</b> <b>${req.body.TenderName}</b> 
     which had been sent to Procuring Entity (<b>${req.body.PE}</b>).
     </p>`;
      con.getConnection(function(err, connection) {
        let sp = "call getSMTPDetails()";
        connection.query(sp, function(error, results, fields) {
          if (error) {
            res.json({
              success: false,
              message: error.message
            });
          } else {
            let Host = results[0][0].Host;
            let Port = results[0][0].Port;
            let Sender = results[0][0].Sender;
            let Password = results[0][0].Password;

            let transporter = nodeMailer.createTransport({
              host: Host,
              port: Port,
              secure: true,
              auth: {
                // should be replaced with real sender's account
                user: Sender,
                pass: Password
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            let mailOptions = {
              to: req.body.PPRAEmail,
              cc: req.body.Applicantemail,
              subject: req.body.subject,
              html: output
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.json({
                  success: false,
                  message: "Not Sent"
                });
              } else {
                res.json({
                  success: true,
                  message: "Sent"
                });
              }
            });
          }
          connection.release();
        });
      });
    }
  } catch (e) {
    res.json({
      success: false,
      message: "Error occured while sending Email"
    });
  }
});

module.exports = { Mailer, SendResetPasswordmail, SendPEAcknowledgement };
