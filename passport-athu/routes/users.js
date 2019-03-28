const express = require('express');

const router = express.Router();

router.get('/login',(req,res)=> {
    res.render('login.ejs')
})

router.get('/register',(req,res)=> {
    res.render('register.ejs')
})

router.post('/register',(req,res)=> {
    const { name , email , password , password2 } = req.body;
    errors = [];
    if(!name || !email || !password || !password2){
        errors.push({msg: 'please fill all the fields'})
    }
    if( password !== password2){
        errors.push({msg : 'password do not match'});
    }
    if( password.length < 6){
        errors.push({msg : 'password must be in 6 letters'});
    }
})

module.exports = router;