const Product = require('../Models/Product');

exports.createProduct = async (req,res) =>{

    try{   
        const { name,description,price,quantity,size,color} = req.body;
    
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
        res.status(200).json(product, {message: 'Product updated successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }}