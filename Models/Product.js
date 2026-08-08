const mongoose = require("mongoose");
const { timeStamp } = require("node:console");
const { type } = require("node:os");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
        required: false,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
},
   {timestamps: true} //date created and updated at}
);

const Product = mongoose.model("Product", ProductSchema);


module.exports = Product; //exporting the Product model to be used in other parts of the application