const express = require('express');
const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/register";
const bodyParser = require('body-parser');
const path = require('path');
const mongo = require('mongodb');
mongoose.connect(url, { useNewUrlParser: true });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('signup');
})

var Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    mobile: Number,
})

var user = mongoose.model('user-details', Schema);
app.post('/insert', (req, res) => {
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
        res.redirect('/get-data');
    });
});


app.get('/get-data', function (req, res) {
    user.find({}, function (err, result) {
        if (err) res.json(err);
        else
            res.render('getdata', { result });
    });

});

app.get('/user/edit/:id', function(req, res){
	res.render('edit', {user: req.userId});
});
 
app.param('id', function(req, res, next, id){
	user.findById(id, function(err, docs){
			if(err) res.json(err);
			else
			{
				req.userId = docs;
				next();
			}
		});	
});
 
 
app.get('/user/:id', function(req, res){
	res.render('show', {user: req.userId});
});
 
app.post('/user/update/:id', (req, res) => {
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



app.post('/user/delete/:id', (req, res) => {
    user.deleteOne({_id: req.params.id},(err, doc) => {
         if (err) res.json(err);
         else 
         console.log('Deleted Successfully!');
         res.render('signup');
     });
 });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})