const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(process.env.DATABASE_URL, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be caught by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log('[MongoDB connection] SUCCESS');

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};
