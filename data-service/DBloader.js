const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const request = require('request');

// Connection URL
const url = 'mongodb+srv://nithin:<password>@cluster0-p7o7f.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const dbName = 'trading-cards';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  request('https://db.ygoprodeck.com/api/v6/cardinfo.php?type=Spell Card', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      insertSpells(db, body, function() {
        client.close();
      });
  });
});

// request('https://db.ygoprodeck.com/api/v6/cardinfo.php?type=Spell Card', { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
// });

const insertSpells = function(db, body, callback) {
    numCards = body.length;
    // Get the documents collection
    const collection = db.collection('spells');
    // Insert some documents
    collection.insertMany(body, function(err, result) {
      assert.equal(err, null);
      assert.equal(numCards, result.result.n);
      assert.equal(numCards, result.ops.length);
      console.log("Inserted " +numCards+ " documents into the collection");
      callback(result);
    });
  }

