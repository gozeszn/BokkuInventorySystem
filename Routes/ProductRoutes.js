const express = require('express');
const Product = require('../Models/Product');
const route = express.Router();

//importing the controller functions
const productController = require('../Controllers/ProductController.js');
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct,getProductsBySizeAndColor } = productController;


route.post('/', createProduct);
route.put('/:id', updateProduct);
route.get('/', getAllProducts);
route.get('/:id', getProductById);
route.delete('/:id', deleteProduct);
route.get('/search', getProductsBySizeAndColor); //search by size and color


module.exports = route;