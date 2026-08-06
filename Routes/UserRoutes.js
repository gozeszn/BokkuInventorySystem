const express = require('express');
const User = require('../Models/user');
const route = express.Router();

const userController = require('../Controllers/UserController');

route.post('/createuser', userController.createUser);
route.post('/loginuser', userController.loginUser);
route.get('/test', async (req,res)=>{
    res.send('user route is working');
})

module.exports = route;

