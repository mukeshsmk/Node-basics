const express = require('express');
const mysql = require('mysql');

const app = express();

//Create connecton
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'sample',
})

//connect connection
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log("DB connected")
    db.query('Create Table Details (name VARCHAR(255), address VARCHAR(255))',(err,result) => {
        if(err){
            throw err;
        }
        console.log('Table Created')
    })
})

//Create Database


app.listen('3000',() => {
    console.log('Server Started on port 3000');
})