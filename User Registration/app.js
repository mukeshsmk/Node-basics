var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));

//Insert

// app.post('/post-insert', function (req, res) {
// MongoClient.connect(url , function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("cricket");
  
//   dbo.collection("user").insertOne(req.body, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     console.log(req.body);
//     db.close();
//   });
//   });
// });

//Insert

mongoose.connect('mongodb://localhost/cricket',{ useNewUrlParser: true });
 
var Schema = new mongoose.Schema({
	_id    : String,
	name: String,
	age   : Number
});
 
var user = mongoose.model('detail', Schema);
 
app.post('/insert', function(req, res){
	new user({
		_id    : req.body.email,
		name: req.body.name,
		age   : req.body.age				
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
	});
});


//Search


// app.post('/post-search', function (req, res) {
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("cricket");
//     dbo.collection("user").find(req.body).toArray(function(err, result) {
//       if (err) throw err;
//       res.status(200).json(result);
//       console.log(result);
//       db.close();
//     });
//   });
// });

// app.get('/view-insert',  function(req, res) {
//     MongoClient.connect(url, function(err, db) {
//         var dbo = db.db("cricket");
//         dbo.collection('user').find({}).toArray().then(function(user) {
//             res.status(200).json(user);
//         });
//     });
// });


app.listen(process.env.PORT || 3001, process.env.IP || '127.0.0.1' );
