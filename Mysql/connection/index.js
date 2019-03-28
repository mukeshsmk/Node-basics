const express = require('express');
const mysql = require('mysql');


//Create connection

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database: 'Nodejs'
});

//Connct DB

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("DB connected")
    db.query("Create Database Mukesh",(err,result)=>{
        if(err){
            throw err;
        }
        console.log("Database Created");
    })
});

const app = express();

app.listen('3000', () => {
    console.log('Server Started on port 3000');
})