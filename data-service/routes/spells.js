const spells = require('express').Router();
const int32 = require('mongodb').Int32;

// db setup
const db = require('../db');
const dbName = 'trading-cards';
const collectionName = 'spells';

db.initialize(dbName, collectionName, function(spellsCollection) { // success callback
    spells.get("/", (req, res) => {
        // return all spells that satisfy query parameters
        console.log(req.query);
        let page = 1;
        let limit = 5;
        if(typeof req.query.page !== "undefined"){
            page = parseInt(req.query.page);
        }
        if(typeof req.query.limit !== "undefined"){
            limit = parseInt(req.query.limit);
        }
        let skips = limit * (page - 1);
        if(typeof req.query.q !== "undefined"){
            //Search
            spellsCollection
            .find({ $text: {$search : req.query.q } })
            .project({score: {$meta: "textScore"}})
            .sort({score: {$meta: "textScore"}})
            .skip(skips).limit(limit).toArray((error, result) => {
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
            spellsCollection.find().sort(sortBy)
            .skip(skips).limit(limit).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
        else{
            // Filter
            let filters = new Object();
            for(let i in req.query){
                if(i !== "page" && i !== "limit"){
                    filters[i] = req.query[i];
                }
            }
            spellsCollection.find(filters)
            .skip(skips).limit(limit).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
    });

    spells.get("/:spellId", (req, res) => {
        console.log(req.params.spellId);
        spellsCollection.findOne({ id: new int32(req.params.spellId) }, (error, result) => {
            if (error) throw error;
            // return spell
            res.json(result);
        });
    });

}, function(err) { // failureCallback
    throw (err);
});

module.exports = spells;