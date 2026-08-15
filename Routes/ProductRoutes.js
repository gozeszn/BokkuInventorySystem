const express = require('express');
const Product = require('../Models/Product');
const route = express.Router();

//importing the authorization middleware to check if the user has the required role to access a specific route
const { authorizeRole } = require('../Middleware/role');

//import the protectToken authentication middleware
const { protectToken } = require('../Middleware/auth');

//importing the controller functions
const productController = require('../Controllers/ProductController.js');
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct,getProductsBySizeAndColor } = productController;


route.post('/', protectToken, authorizeRole('SuperAdmin'), createProduct);
route.put('/:id', protectToken, authorizeRole('SuperAdmin', 'storekeeper'), updateProduct);
route.get('/', protectToken, getAllProducts);
route.get('/:id', protectToken, authorizeRole('SuperAdmin'), getProductById);
route.delete('/:id', protectToken, authorizeRole('SuperAdmin'), deleteProduct);
route.get('/search', protectToken, getProductsBySizeAndColor); //search by size and color


module.exports = route;