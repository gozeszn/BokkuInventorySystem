const { default: mongoose } = require('mongoose');
const User = require('../Models/user');
const user = require('../Models/user');

exports.createUser = async (req,res) =>{
    try{
        const {name,email,password,PhoneNumber,gender,HasAdminAcess,role} = req.body;



        //check all fields are provided

        if(!req.name || !req.description || !req.price || !req.quantity || !req.size || !req.color){
            return res.status(401).json({message: 'Please return all fields'});
        }
        //check for email
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists){
            return res.status(400).json({message: 'this Email exists'});
        }

        //checks for Phone number 
        const UserPhoneNumber = await User.findOne({PhoneNumber: req.body.PhoneNumber});
        if(UserPhoneNumber){
            return res.status(400).json({message: 'Phone number has been used'});
        }

        const salt =await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password,salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
            PhoneNumber: req.body.PhoneNumber,
            gender: req.body.gender,
            HasAdminAcess: req.body.HasAdminAcess,
            role: req.body.role || 'user' //default role is user
        });
        await user.save();
        res.status(201).json(user);
        if(!user){
            return res.status(404).json({message: 'User does not exist'});
        }

    }catch(error){
        res.status(501).json({message: error.message});
    }
}