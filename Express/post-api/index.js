const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const users = [
    {
        name: "Mukesh kumar",
        age : 23,
    },
    {
        name: "Dhinesh kumar",
        age : 34,
    },
    {
        name: "Jagan",
        age : 45,
    }
]
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extendes : false}));

// app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render('index.ejs',{
        title : 'customers',
        users : users,
    });
})

app.listen('3000',()=>{
    console.log('Server Started on port 3000');
})