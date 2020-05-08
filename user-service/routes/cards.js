const cards = require('express').Router();
const AWS = require("aws-sdk");
require('dotenv').config()

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

let docClient = new AWS.DynamoDB.DocumentClient();

let table = "Cards";

cards.post("/", function (req, res) {
  console.log(req.body)
  let params = {
    TableName: table,
    Item: req.body
  };
  console.log("Adding a new item...");
  docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        res.status(400).send('Bad Request');
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        res.send('OK');
      }
  });
});

cards.get("/", (req, res) => {
  let params = {
    TableName: table
  };
  docClient.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(404).send('Not Found');
    } else {
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      res.json(data);
    }
  });
});

cards.get("/:cardId", (req, res) => {
  console.log(typeof req.params.cardId)
  let id = parseInt(req.params.cardId)
  console.log(typeof id)
  let params = {
    TableName: table,
    Key:{
      "id": id
    }
  };
  docClient.get(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(404).send('Not Found');
    } else {
      if(Object.keys(data).length === 0) {
        res.status(404).send('Not Found');
      }
      console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      res.json(data);
    }
  });
});

cards.delete('/:cardId', function (req, res) {
  let id = parseInt(req.params.cardId)
  console.log(typeof id)
  let params = {
    TableName: table,
    Key: {
      "id": id
    },
    ConditionExpression: "attribute_exists(id)"
  };
  console.log("Deleting an item...");
  docClient.delete(params, function(err, data) {
      if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        res.status(404).send('Not Found');
      } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        res.status(200).send('OK');
      }
  });
});

module.exports = cards;