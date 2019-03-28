const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());
const players = [
       { id:1, name: "player1"},
       { id:2, name: "player2"},
       { id:3, name: "player3"}
    
]
// app.get('',(req,res) =>{
//     res.send("Welcome Back");
// })



//post api
    app.post('/api/players',(req,res) =>{
    
    const schema = {
        name : Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result)

    if(result.error){
        res.status(404).send(result.error.details[0].message);
        return;
    }

    const player = {
        id : players.length + 1,
        name : req.body.name
    }
    players.push(player);
    res.send(player);
})




//get api

// app.get('/api/players/:id',(req,res)=>{
//     const player = players.find(c=> c.id === parseInt(req.params.id));
//     if(!player) res.status(404).send("The given id is not here");
//     res.send(player);
// })


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server Started on port ${port}`);
})