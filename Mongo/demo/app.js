const express = require('express');
const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/demo";
const bodyParser = require('body-parser');
const path = require('path');

mongoose.connect(url,{ useNewUrlParser: true });
const app = express();
app.use(express.json());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendes : false}));

app.use(express.static(path.join(__dirname,'public')))

var Schema = new mongoose.Schema({
	email    : String,
	name: String,
	age   : Number
});
 
app.get('/',(req,res)=>{
    res.render('index');
})

var Details = mongoose.model('user', Schema);
app.post('/insert',(req,res)=>{
    new Details({
		email    : req.body.email,
		name: req.body.name,
		age   : req.body.age				
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
	});
});

// app.get('/api/players/:id',(req,res)=>{
//         const player = players.find(c=> c.id === parseInt(req.params.id));
//        if(!player) res.status(404).send("The given id is not here");
//         res.send(player);
     
// })
app.listen('3000',()=>{
    console.log('Server started on port 3000')
})