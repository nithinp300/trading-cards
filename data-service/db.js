const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

const credentials = fs.readFileSync('../db_creds.txt','utf8');
const dbConnectionUrl = 'mongodb+srv://'+credentials+'@cluster0-p7o7f.mongodb.net/test?retryWrites=true&w=majority';

function initialize(
    dbName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            console.log('[MongoDB connection] SUCCESS');

            successCallback(dbObject);
        }
    });
}

module.exports = {
    initialize
};
