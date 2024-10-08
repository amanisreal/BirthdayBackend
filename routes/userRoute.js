const express = require('express');
const User = require('../models/userSchema');
const auth = require('../middleware/auth')
const router = new express.Router();

//create user
router.post('/createUser', async (req, res) => {
    try{
        const newUser = new User(req.body);
        console.log(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    }
    catch(error){
        console.log(error);
    }
})

router.get('/getUser', auth, async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    try{
        res.send(req.user)
    }catch(error){
        re.send(error)
    }
})

//login user
router.post('/login', async (req, res) => {
    try{    
        const password = req.body.password;
        const user = await User.findByCredentials(password);
        if(!user){console.log('me'); throw new Error('Invalid User');}
        const token = await user.generateAuthToken();
        await user.save();
        res.status(200).send({user, token});
    }catch(error){
        res.status(400).send(error);
    }
})

router.post('/sendMsg', auth, async(req, res) => {
    try{
        const option = req.body.mcqOption;
        console.log(option);
        await req.user.saveOptions(option);
        await req.user.save();
        res.status(200).send(req.user.mcqDone)
    }catch(e){

    }
})

module.exports = router