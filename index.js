require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./Config/databaseConfig');
const productRoutes = require('./Routes/ProductRoutes');
const userRoutes = require('./Routes/UserRoutes.js')
const productController = require('./Controllers/ProductController.js');
 // Load environment variables from .env file   

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());

// Routes

app.use('/products', productRoutes);
app.use('/users', userRoutes);


//port 
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});