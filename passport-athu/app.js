const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');

var url = "mongodb://localhost:27017/";

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '.../public')));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/',require('./routes/index'));

mongoose.connect('mongodb://localhost/register',{ useNewUrlParser: true });
 
var Schema = new mongoose.Schema({
	name : String,
    email : String,
    password : String,
    password2 : String
});
 
var user = mongoose.model('users', Schema);
 
app.post('/users/register',[
  check('name').isLength({ min: 5 }),
  check('email').isEmail(),
  check('password').isLength({ min: 5 }),
  check('password2').isLength({ min: 5 })
], (req, res) => {
  
  if( req.body.password !==  req.body.password2 ){
    return res.status(422).send("password and confirm password not same");

  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
	new user({
       
        name: req.body.name,
        email : req.body.email,
        password : req.body.password,		
        password2 : req.body.password2,		
	}).save(function(err, doc){
    if(err) res.json(err);
    else    res.send('Successfully inserted!');
  });
  
});


app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 7000;
app.listen(PORT,()=> {
    console.log(`server started on port ${PORT}`);
})