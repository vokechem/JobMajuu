var express = require("express");
var Authentication = express();
var request = require("request");

Authentication.get("/", function(req, res) {
  var consumer_key = "7Lop01hjDnzAKqUPWkKjuFkoAo43brIp";
  var consumer_secret = "Fb1HO5sOaCf9wGcD";
  var url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  auth =
    "Basic " +
    new Buffer(consumer_key + ":" + consumer_secret).toString("base64");
  request(
    {
      url: url,
      headers: {
        Authorization: auth
      }
    },
    function(error, response, body) {
      let oauth_token = JSON.parse(body).access_token;
      var url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
      // console.log("token", oauth_token);
      var auth = "Bearer " + oauth_token;
      request(
        {
          method: "POST",
          url: url,
          headers: {
            Authorization: auth
          },
          json: {
            ShortCode: "601753",
            ResponseType: "Completed",
            ConfirmationURL: "http://f7c53716.ngrok.io/api/confirmation",
            ValidationURL: "http://f7c53716.ngrok.io/api/validation_url"
          }
        },
        function(error, response, body) {
          //console.log(body);
          ///console.log(response.body);
          // TODO: Use the body object to extract the
          //   console.log(JSON.parse(body).ResponseDescription);
          //   res.json({
          //     message: "JSON.parse(body).ResponseDescription"
          //   });
        }
      );
    }
  );
});
module.exports = Authentication;
