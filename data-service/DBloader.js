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
  const trapCollection = db.collection('traps');
  trapCollection.estimatedDocumentCount(function(err, count) {
    if(count == 0){
      request('https://db.ygoprodeck.com/api/v6/cardinfo.php?type=Trap Card', { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          insertCards(trapCollection, body, setTimeout(insertSpells, 2000, db));
      });
    }
    else{
      console.log('Trap Collection');
      console.log(count);
      setTimeout(insertSpells, 2000, db);
    }
  });
})

function insertSpells(db) {
  const spellCollection = db.collection('spells');
  spellCollection.estimatedDocumentCount(function(err, count) {
    if(count == 0){
      request('https://db.ygoprodeck.com/api/v6/cardinfo.php?type=Spell Card', { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          insertCards(spellCollection, body, setTimeout(insertMonsters, 2000, db));
      });
    }
    else{
      console.log('Spell Collection');
      console.log(count);
      console.log('Monster Collection');
      setTimeout(insertMonsters, 2000, db);
    }
  });
}

let monsterTypes = ['Normal Monster', 'Normal Tuner Monster', 'Effect Monster', 
    'Tuner Monster', 'Flip Effect Monster', 'Spirit Monster', 'Union Effect Monster', 
    'Gemini Monster', 'Pendulum Effect Monster', 'Pendulum Normal Monster', 
    'Pendulum Tuner Effect Monster', 'Ritual Monster', 'Ritual Effect Monster', 
    'Toon Monster', 'Fusion Monster', 'Synchro Monster', 'Synchro Tuner Monster', 
    'Synchro Pendulum Effect Monster', 'XYZ Monster', 'XYZ Pendulum Effect Monster', 
    'Link Monster', 'Pendulum Flip Effect Monster', 'Pendulum Effect Fusion Monster'];
function insertMonsters(db, i) {
  if (i == undefined) {
    i = 0;
  }
  if (i++ >= monsterTypes.length) {
    client.close();
    return;
  }
  console.log(monsterTypes[i])
  const monsterCollection = db.collection('monsters');
  request('https://db.ygoprodeck.com/api/v6/cardinfo.php?type='+monsterTypes[i], { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    insertCards(monsterCollection, body, function() {
      setTimeout(insertMonsters, 2000, db, i);
    });
  });
}

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

