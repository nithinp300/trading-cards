const cards = require('express').Router();
var AWS = require("aws-sdk");
require('dotenv').config()

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Cards";

cards.post("/", function (req, res) {
  console.log(req.body)
  var params = {
    TableName: table,
    Item: req.body
  };
  console.log("Adding a new item...");
  docClient.put(params, function(err, data) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
          res.send('POST request was successful')
      }
  });
})

module.exports = cards;