const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const details = [
    { id : 1, name : "mukesh"},
    { id : 2, name : "Arjun"},
    { id : 3, name : "Sanjay"}
]

app.get('/',(req,res) => {
    res.send('Hello World');
})

app.get('/api/details',(req,res)=>{
    res.send([1,2,3])
})

app.get('/api/details/:id',(req,res) => {
    const detail = details.find( c => c.id === parseInt(req.params.id))
    if(!detail) res.status(404).send('The given Id is not find');
    res.send(detail);

})

app.post('/api/details',(req,res)=>{
    const schema = {
        name : Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body,schema);
    console.log(result);

    if(result.error){
        res.status(400).send(result.error)
    }    
})

app.post('/api/details',(req,res) => {
    console.log(req.body);
    const detail = {
        id : details.length+1,
        name : req.body.name
    }
    details.push(detail);
    res.send(detail)


})




// app.get('/api/names/:id',(req,res)=>{
//     const name = names.find(c => c.id === parseInt(req.params.id))
//     if(!name)  res.status(404).send("the given ID is not found")
   
//     res.send(name)
// })

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Start a port ${port}`);
})