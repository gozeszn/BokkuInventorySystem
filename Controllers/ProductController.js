const Product = require('../Models/Product');


exports.createProduct = async (req,res) =>{

    try{   
        const { name,description,price,quantity,size,color} = req.body;
        
        if(!name || !description || !price || !quantity || !size || !color){
            return res.status(401).json({message: 'Please return all fields'})
        }

    
        const product = new Product({
            name,
            description,
            price,
            quantity,
            size,
            color
        });
        await product.save();
        res.status(201).json(product);
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.updateProduct = async(req,res) =>{
    try{
        const {id} = req.params;
        const {name,description,price,quantity,size,color} = req.body;
        const product = await Product.findByIdAndUpdate(id,{name,description,price,quantity,size,color},{new:true});

        if(!product){
            return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }};


exports.getAllProducts = async(req,res) =>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }};

    exports.getProductById = async(req,res) =>{
        try{
            const {id} = req.params;
            const product = await Product.findById(id);
            if(!product){
                return res.status(404).json({message: 'Product not found'});
            }
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };

    exports.deleteProduct = async(req,res) =>{
        try{
            const {id} = req.params;
            const product = await Product.findByIdAndDelete(id);
            if(!product){
                return res.status(404).json({message: 'Product not found'});
            }
            res.status(200).json({message: 'Product deleted successfully'});
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };


    exports.getProductsBySize = async(req,res) =>{
        try{
            const {size} = req.params;
            const products = await Product.find({size});
            if(products.length === 0){
                return res.status(404).json({message: 'No products found for the given size'});
            }
            res.status(200).json(products);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };

    exports.getProductsBySizeAndColor = async(req,res) =>{
        try{
            const {size,color} = req.query;
            const products = await Product.find({size,color});
            if(products.length === 0){
                return res.status(404).json({message: 'No products found for the given size and color'});
            }
            res.status(200).json(products);
        }catch(error){
            res.status(500).json({message: error.message});
        }
    };