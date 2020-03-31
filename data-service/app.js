const express = require('express')
const app = express();
const int32 = require('mongodb').Int32;
const root = require('./routes/index');
const monstersRouter = require('./routes/monsters');
const spellsRouter = require('./routes/spells');
const trapsRouter = require('./routes/traps');

// Connect root route to our application
app.use('/', root);

// Connect monster routes to application
app.use('/monsters', monstersRouter);

// Connect spell routes to application
app.use('/spells', spellsRouter);

// Connect spell routes to application
app.use('/traps', trapsRouter);

// db setup
const db = require('./db');
const dbName = 'trading-cards';
const collectionName = 'monsters';

// db init
db.initialize(dbName, function(dbObject) { // success callback

    // get collections
    const trapsCollection = dbObject.collection('traps');

/*     app.get("/traps", (req, res) => {
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

    app.get("/traps/:id", (req, res) => {
        let trapId = req.params.id;
        console.log(trapId);
        trapsCollection.findOne({ id: new int32(trapId) }, (error, result) => {
            if (error) throw error;
            // return trap
            res.json(result);
        });
    }); */
}, function(err) { // failure callback
    throw (err);
});

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`));