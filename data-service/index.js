const express = require('express')
const app = express();
const int32 = require("mongodb").Int32;

app.get('/', (req, res) => {
    res.send('This is the Yu-Gi-Oh! Trading Cards RESTful API');
});

// db setup
const db = require('./db');
const dbName = 'trading-cards';
//const collectionName = 'monsters';

// db init
db.initialize(dbName, function(dbObject) { // success callback

    // get collections
    const monstersCollection = dbObject.collection('monsters');
    
    // db CRUD routes

    app.get("/monsters", (req, res) => {
        // return all monsters that satisfy query parameters
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
            //Search
            monstersCollection
            .find({ $text: {$search : req.query.q } })
            .project({score: {$meta: "textScore"}})
            .sort({score: {$meta: "textScore"}}).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
        else if(typeof req.query.sort !== "undefined"){
            // Sort
            let sortBy = new Object();
            let sortByStr = req.query.sort;
            let ascDescNum = 1;
            let firstChar = req.query.sort.substring(0, 1);
            if(firstChar === "-"){
                ascDescNum = -1;
                sortByStr = req.query.sort.substring(1);
            }
            sortBy[sortByStr] = ascDescNum;
            monstersCollection.find().sort(sortBy).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
        else{
            // Filter
            monstersCollection.find(req.query).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
    });

    app.get("/monsters/:id", (req, res) => {
        let monsterId = req.params.id;
        console.log(monsterId)
        monstersCollection.findOne({ id: new int32(monsterId) }, (error, result) => {
            if (error) throw error;
            // return monster
            res.json(result);
        });
    });
}, function(err) { // failure callback
    throw (err);
});

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`));