var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true },(err,db) => {
    if(err) throw err;
    console.log("db created Successfully");
    var dbo = db.db("test");
    dbo.createCollection("user",(err,res)=>{
        if(err) throw err;
        console.log("collection created");
        
    })
   
})