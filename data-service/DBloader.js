const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const request = require('request');
const fs = require('fs');

const password = fs.readFileSync('../db_creds.txt','utf8');
// Connection URL
const url = 'mongodb+srv://nithin:'+password+'@cluster0-p7o7f.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const dbName = 'trading-cards';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  const trapsCollection = db.collection('traps');
  trapsCollection.estimatedDocumentCount(function(err, count) {
    if(count == 0){
      request('https://db.ygoprodeck.com/api/v6/cardinfo.php?type=Trap Card', { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          insertCards(trapsCollection, body, function() {
              client.close();
          });
      });
    }
    else{
      console.log(count);
      client.close();
    }
  });

  const spellsCollection = db.collection('spells');
  spellsCollection.estimatedDocumentCount(function(err, count) {
    if(count == 0){
      request('https://db.ygoprodeck.com/api/v6/cardinfo.php?type=Spell Card', { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          insertCards(spellsCollection, body, function() {
              client.close();
          });
      });
    }
    else{
      console.log(count);
      client.close();
    }
  });
});

const insertCards = function(collection, body, callback) {
    numCards = body.length;
    // Get the collection
    //const collection = db.collection('traps');
    // Insert some documents
    collection.insertMany(body, function(err, result) {
      assert.equal(err, null);
      assert.equal(numCards, result.result.n);
      assert.equal(numCards, result.ops.length);
      console.log("Inserted " +numCards+ " documents into the collection");
      callback(result);
    });
  }

