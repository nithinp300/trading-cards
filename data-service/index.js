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

    app.get("/monsters", (req, res) => {
        // return all monsters filtered by query parameters
        console.log(req.query);
        if(typeof req.query.level !== "undefined"){
            req.query.level = int32(req.query.level);
        }
        if(typeof req.query.atk !== "undefined"){
            req.query.atk = int32(req.query.atk);
        }
        if(typeof req.query.def !== "undefined"){
            req.query.def = int32(req.query.def);
        }
        if(typeof req.query.q !== "undefined"){
            dbCollection.find({ '$text': {'$search' : req.query.q } }).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
        else{
            dbCollection.find(req.query).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
    });

    app.get("/monsters/:id", (request, response) => {
        let monsterId = request.params.id;
        console.log(monsterId)
        dbCollection.findOne({ id: new int32(monsterId) }, (error, result) => {
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