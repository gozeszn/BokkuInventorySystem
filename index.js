require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./Config/databaseConfig');
const productRoutes = require('./Routes/ProductRoutes');
const productController = require('./Controllers/ProductController.js');
 // Load environment variables from .env file   

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());

// Routes

app.use('/products', productRoutes);


//port 
const Port = 5000;
app.listen(process.env.PORT || Port, () => {
    console.log(`Server is running on port ${Port}`);
});