const mongoose = require('mongoose');
const { timeStamp } = require('node:console');
const { type } = require('node:os');

const ProductSchema = new mongoose.Schema(
    {
       name: {
        type: String,
        required: true
       },
       description: {
        type: String,
        required: true
       },

       price:{
        type: Number,
        required: true
       },

       quantity: {
        type: Number,
        required: true
       },

       size:{
        type: String,
        required: true
       },

       timestamps: true //date created and updated
    
});

const Product = mongoose.model('Product', ProductSchema);