const traps = require('express').Router();
const int32 = require('mongodb').Int32;

// db setup
const db = require('../db2');
const dbName = 'trading-cards';
const collectionName = 'traps';

db.initialize(dbName, collectionName, function(trapsCollection) { // success callback
    traps.get("/", (req, res) => {
        // return all traps that satisfy query parameters
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
            trapsCollection
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
            trapsCollection.find().sort(sortBy)
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
            trapsCollection.find(filters)
            .skip(skips).limit(limit).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
    });

    traps.get("/:trapId", (req, res) => {
        console.log(req.params.trapId);
        trapsCollection.findOne({ id: new int32(req.params.trapId) }, (error, result) => {
            if (error) throw error;
            // return trap
            res.json(result);
        });
    });

}, function(err) { // failureCallback
    throw (err);
});

module.exports = traps;