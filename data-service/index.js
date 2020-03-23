const express = require('express')
const app = express();
const int32 = require("mongodb").Int32;

app.get('/', (req, res) => {
    res.send('This is the Yu-Gi-Oh! Trading Cards RESTful API');
});

// db setup
const db = require("./db");
const dbName = 'trading-cards';
const collectionName = 'monsters';

// db init
db.initialize(dbName, collectionName, function(dbCollection) { // success callback
    // db CRUD routes

    app.get("/monsters", (request, response) => {
        // return all monsters
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });

    app.get("/monsters/:id", (request, response) => {
        let monsterId = request.params.id;
        console.log(monsterId)
        dbCollection.findOne({ "id": new int32(monsterId) }, (error, result) => {
            if (error) throw error;
            // return monster
            response.json(result);
        });
    });
}, function(err) { // failure callback
    throw (err);
});

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`));