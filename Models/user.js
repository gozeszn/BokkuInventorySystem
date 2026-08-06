//Mongoose
const mongoose = require('mongoose');
const { timeStamp } = require('node:console');
const { type } = require('node:os');
const brycpt = require('bcryptjs'); 

const userSchema = new mongoose.Schema({
    
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        PhoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        gender:{
            type: String,
            required: true
        },
        HasAdminAccess:{
            type: Boolean,
            default: false
        },
        role:{
            type: String,
            enum: ['admin', 'user'],
            default: 'user'

        },},
        
        {
            timestamps: true  //Date created and Date Updated at
        }

)


const User = mongoose.model('User', userSchema); 
//.model(): builder, "User": DB table, userSchema is the blueprint for the prior

module.exports = User;