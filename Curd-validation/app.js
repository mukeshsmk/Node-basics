const express = require('express');
const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/register";
const bodyParser = require('body-parser');
const path = require('path');
const mongo = require('mongodb');
const { check, validationResult } = require('express-validator/check');
mongoose.connect(url, { useNewUrlParser: true });
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret:"dgcuykdcgbyadbc",resave: false,saveUninitialized: true}));

app.get('/', (req, res) => {
    res.render('signup');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/user/welcome', (req, res) => {
    res.render('welcome');
})


var Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    mobile: Number,
})

var user = mongoose.model('user-details', Schema);

//Insert

app.post('/insert', [
    check('name','Name is Required').isLength({ min: 5 }),
    check('email','Invalid Email').isEmail(),
    check('password','Password must be in 5 letters').isLength({ min: 5 }),
    check('age','Invalid age').isLength({ min: 2 }),
    check('mobile','Invalid must be in 10 numbers').isLength({ min: 10 }),
    check('mobile','Invalid mobile').isLength({ max : 10 }),
  ], (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        mobile: req.body.mobile,

    }).save((err, doc) => {
        if (err) res.json(err);
        else
            console.log('Successfully inserted!');
        res.redirect('/login');
    });
});

//get-data

app.get('/get-data', function (req, res) {
    user.find({}, function (err, result) {
        if (err) res.json(err);
        else
            res.render('getdata', { result });
    });

});

app.get('/user/edit/:id', function (req, res) {
    res.render('edit', { user: req.userId });
});

app.param('id', function (req, res, next, id) {
    user.findById(id, function (err, docs) {
        if (err) res.json(err);
        else {
            req.userId = docs;
            next();
        }
    });
});


app.get('/user/:id', function (req, res) {
    res.render('show', { user: req.userId });
});

//Update

app.post('/user/update/:id',(req, res) => {
    
   
        user.findByIdAndUpdate({_id: req.params.id},{
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         age: req.body.age,
         mobile: req.body.mobile,
        },(err, doc) => {
             if (err) res.json(err);
             else 
             console.log('Successfully updated!');
             res.redirect('/get-data');
         });
});

//Delete

app.post('/user/delete/:id', (req, res) => {
    user.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (err) res.json(err);
        else
            console.log('Deleted Successfully!');
        res.redirect('/get-data');
    });
});

//Login

app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    user.find({ email : email, password : password }, function (err, result) {
        if (err) {
            res.json(err);
        }
        if (!email == result[0].email && !password == result[0].password) {

          console.log("login failed") 
        }
        return res.redirect('/user/welcome');
        console.log("login successfully") 


    });
});


app.post('/admin/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    user.find({ email, password }, function (err, result) {
        if (err) {
            res.json(err);
        }
        if (email == 'admin@gmail.com' && password == 'admin123') {

            res.redirect('/get-data');
        }
        


    });
});


app.get('/dashboard',(req,res)=>{
    if(!req.session.user){
        return res.status(401);
    }
    res.status(200).send("welcome to session login");
})

app.get('/user-logout',(req,res)=>{
    res.redirect('/login');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})