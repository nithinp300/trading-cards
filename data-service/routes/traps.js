const traps = require('express').Router();
const int32 = require('mongodb').Int32;

// db setup
const db = require('../db');
const dbName = 'trading-cards';
const collectionName = 'traps';

db.initialize(dbName, collectionName, function(trapsCollection) { // success callback
  traps.get("/", (req, res) => {
    // return all traps that satisfy query parameters
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
    let skips = limit * (page - 1);
    if(typeof params.q !== "undefined") {
      //Search
      trapsCollection
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
      trapsCollection.find(params).sort(sortBy)
      .skip(skips).limit(limit).toArray((error, data) => {
          if (error) throw error;
          trapsCollection.countDocuments(params, (error, count) => {
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