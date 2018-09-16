
const MONGODB_URL = 'mongodb://dreckguy:bla1bla2bla3@ds219318.mlab.com:19318/heroku_907mrctp';
const MongoClient = require('mongodb').MongoClient;


exports.getSongRequests = function(cb){

        MongoClient.connect(MONGODB_URL, function(err, client) {
            const db = client.db('heroku_907mrctp');
            const uploads = db.collection('uploads');
              if(err) {
                console.error(err);
            }
                uploads.find({}).toArray(function(err, docs) {
                    cb(err,docs);
                    client.close();
              });
        });
    }

    

    exports.insert = function(newUpload,cb){

        MongoClient.connect(MONGODB_URL, function(err, client) {
            const db = client.db('heroku_907mrctp');
            const uploads = db.collection('uploads');
                uploads.insert(newUpload);
                cb(err,newUpload);

                client.close();    

        });


    }

    exports.update = function(doc,cb){
        MongoClient.connect(MONGODB_URL, function(err, client) {
            const db = client.db('heroku_907mrctp');
            const uploads = db.collection('uploads');
                uploads.update({id: doc.id},doc);
                cb(err,doc);
                client.close();    

        });
    }

    exports.changeStatus = function(doc,status,cb){
        doc.status = status;
        exports.update(doc,cb);
    }
