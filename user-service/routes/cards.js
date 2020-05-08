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
  let params = {
    TableName: table,
    Item: req.body
  };
  console.log("Adding a new item...");
  docClient.put(params, function(err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        res.status(400).json({ error: 'Could not create Card' });
      }
      res.json(data)
  });
});

cards.get("/", (req, res) => {
  let params = {
    TableName: table
  };
  docClient.scan(params, function(err, data) {
    if (err) {
      res.status(400).json({ error: "Error retrieving Cards" });
    } else {
      res.json(data.Items);
    }
  });
});

cards.get("/:cardId", (req, res) => {
  let id = parseInt(req.params.cardId)
  let params = {
    TableName: table,
    Key:{
      "id": id
    }
  };
  docClient.get(params, function(err, data) {
    if (err) {
      res.status(400).json({ error: "Error retrieving Card" });
    }
    if(data.Item) {
      res.json(data);
    }
    else {
      res.status(404).json({ error: `Card with id: ${id} not found` });
    }
  });
});

cards.delete('/:cardId', function (req, res) {
  let id = parseInt(req.params.cardId)
  let params = {
    TableName: table,
    Key: {
      "id": id
    },
    ConditionExpression: "attribute_exists(id)"
  };
  console.log("Deleting an item...");
  docClient.delete(params, function(err) {
    if (err) {
      console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(404).json({ error: `Card with id: ${id} not found` });
    }
    res.json({ success: true });
  });
});

module.exports = cards;