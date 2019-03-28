var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/userDetails";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("userDetails");
  var myobj = { name: "Jagan", address: "Singanallur" };
  dbo.collection("details").insertOne(myobj,(err,res) => {
      if(err) throw err;
      console.log("Details Inserted");
      db.close();
  });
});