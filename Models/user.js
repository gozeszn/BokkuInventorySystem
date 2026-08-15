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
            type: Number,
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
            enum: ['SuperAdmin','storekeeper','user'],
            default: 'user'

        },},
        
        {
            timestamps: true  //Date created and Date Updated at
        }

)


const User = mongoose.model('User', userSchema); 
//.model(): builder, "User": DB table, userSchema is the blueprint for the prior


// Inside your user schema file, right before module.exports:
userSchema.pre('save', function(next) {
    // Check if the role is an admin type
    if (this.role === 'storekeeper' || this.role === 'SuperAdmin') {
        this.HasAdminAccess = true;
    }
    next();
});

module.exports = User;