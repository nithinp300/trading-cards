const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('This is the Yu-Gi-Oh! Trading Cards RESTful API');
});

// db setup
const db = require("./db");
const dbName = 'trading-cards';
const collectionName = 'monsters';

// db init
db.initialize(dbName, collectionName, function(dbCollection) { // success callback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });

    // db CRUD routes

}, function(err) { // failure callback
    throw (err);
});

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`));