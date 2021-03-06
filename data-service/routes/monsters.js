const monsters = require('express').Router();
const int32 = require('mongodb').Int32;

// database setup
const db = require('../db');
const dbName = 'trading-cards';
const collectionName = 'monsters';

db.initialize(dbName, collectionName, function(monstersCollection) { // success callback
  monsters.get("/", (req, res) => {
    // return all monsters that satisfy query parameters
    console.log(req.query);
    let page = 1;
    let limit = 6;
    if(typeof req.query.page !== "undefined" && req.query.page !== "") {
      page = parseInt(req.query.page);
    }
    if(typeof req.query.limit !== "undefined" && req.query.limit !== "") {
      limit = parseInt(req.query.limit);
    }
    let params = new Object();
    // only get search, sort and filter params
    for(let i in req.query){
      if(i !== "page" && i !== "limit" && req.query[i] !== "") {
        params[i] = req.query[i];
      }
    }
    if(typeof params.level !== "undefined") {
      params.level = int32(params.level);
    }
    if(typeof params.atk !== "undefined") {
      params.atk = int32(params.atk);
    }
    if(typeof params.def !== "undefined") {
      params.def = int32(params.def);
    }
    let skips = limit * (page - 1);
    if(typeof params.q !== "undefined") {
      //Search
      monstersCollection
      .find({ $text: {$search : req.query.q } })
      .project({score: {$meta: "textScore"}})
      .sort({score: {$meta: "textScore"}})
      .toArray((error, result) => {
        if (error) throw error;
        res.json(result);
      });
    }
    else {
      let sortBy = new Object();
      if(typeof params.sort === "undefined"){
        // by default we sort by name alphabetically
        sortBy["name"] = 1;
      }
      else{
        // use sort parameter and value given
        let sortByStr = params.sort;
        let ascDescNum = 1;
        let firstChar = params.sort.substring(0, 1);
        if(firstChar === "-"){
          ascDescNum = -1;
          sortByStr = params.sort.substring(1);
        }
        sortBy[sortByStr] = ascDescNum;
      }
      delete params.sort;
      monstersCollection.find(params).sort(sortBy)
      .skip(skips).limit(limit).toArray((error, data) => {
          if (error) throw error;
          monstersCollection.countDocuments(params, (error, count) => {
            if (error) throw error;
            let result = new Object();
            result.page = page;
            result.per_page = limit;
            result.total = count;
            result.total_pages = Math.ceil(count / limit);
            result.data = data;
            res.json(result);
          });
      });
    }
  });

  monsters.get("/:monsterId", (req, res) => {
    console.log(req.params.monsterId);
    monstersCollection.findOne({ id: new int32(req.params.monsterId) }, (error, result) => {
      if (error) throw error;
      // return monster
      res.json(result);
    });
  });

}, function(error) { // failureCallback
    throw (error);
});

module.exports = monsters;