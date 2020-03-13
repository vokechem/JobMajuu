const express = require("express");
const validation_url = express.Router();
validation_url.post("/", (req, res) => {
  // console.log("Validate", req.body);
  res.json({
    ResultCode: 0,
    ResultDesc: "Success",
    ThirdPartyTransID: 0
  });
});
module.exports = validation_url;
