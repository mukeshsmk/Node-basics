const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url,(err,db)=>{
    if(err) throw err;
    var dbo = db.db('demo');
    console.log("Database created Successfully");
    dbo.createCollection("Details",(err,result)=>{
    if(err) throw err;
    console.log("Collection Created Successfully")
    })
    
})