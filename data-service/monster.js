const int32 = require("mongodb").Int32;

// db setup
const db = require('./db2');
const dbName = 'trading-cards';
const collectionName = 'monsters';

exports.list = function(req, res){
    db.initialize(dbName, collectionName, function(dbCollection) { // success callback
        console.log(req.query);
        let page = 1;
        let limit = 5;
        if(typeof req.query.page !== "undefined"){
            page = parseInt(req.query.page);
        }
        if(typeof req.query.limit !== "undefined"){
            limit = parseInt(req.query.limit);
        }
        if(typeof req.query.level !== "undefined"){
            req.query.level = int32(req.query.level);
        }
        if(typeof req.query.atk !== "undefined"){
            req.query.atk = int32(req.query.atk);
        }
        if(typeof req.query.def !== "undefined"){
            req.query.def = int32(req.query.def);
        }
        let skips = limit * (page - 1);
        if(typeof req.query.q !== "undefined"){
            //Search
            dbCollection
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
            dbCollection.find().sort(sortBy)
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
            dbCollection.find(filters)
            .skip(skips).limit(limit).toArray((error, result) => {
                if (error) throw error;
                res.json(result);
            });
        }
    }, function(err) { // failureCallback
        throw (err);
    });
}