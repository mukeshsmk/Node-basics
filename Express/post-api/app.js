const express = require('express');
const app = express();
app.use(express.json());
const players = [
    { id:1 , name : "mukesh" },
    { id:2 , name : "sanjay" },
];



app.get('/',(req,res)=>{
    res.render('index,ejs');
})
// poast method

app.post('/api/players',(req,res)=>{
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send("Name is Required and Name must be in 3 leters");
        return;
    }
    else{
        res.status(200);
    }

    const player = {
        id : players.length + 1,
        name : req.body.name
    }
    players.push(player);
    res.send(player);
})

// put method

app.put('/api/players/:id',(req,res)=>{
    const player = players.find(c =>cid === parseInt(req.params.id))
    if(!players){
        res.status(404).send("The given ID is not here");
    }
    res.send(player);

    if(!req.body.name || req.body.name.length < 3 ){
        res.status(400).send("The given name is not here")
    }

    player.name = req.body.name;
    res.send(player); 

})

app.listen('5000',()=>{
    console.log("Server started on port 5000")
})