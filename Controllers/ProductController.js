const Product = require('../Models/Product');
const upload = require('../Middleware/upload');
const sendEmail = require('../Middleware/emailsender');

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


//create a product with image upload to cloudinary
// create a product with image upload to cloudinary
exports.createProductWithImage = async (req, res) => {
    try {
    

            // 2. NOW it is safe to extract fields because upload.single() has populated req.body!
            const { name, description, price, quantity, size, color } = req.body || {};

            // Check if all text fields are provided
            if (!name || !description || !price || !quantity || !size || !color) {
                return res.status(400).json({ message: 'Please return all fields' });
            }

            // Check if the image file was successfully uploaded to Cloudinary
            if (!req.file) {
                return res.status(400).json({ message: 'Please upload an image' });
            }
            
            try {
                // 3. Save your product securely to MongoDB
                const product = new Product({
                    name,
                    description,
                    price,
                    quantity,
                    size,
                    color,
                    image: req.file.path // The secure Cloudinary URL string
                });

                await product.save();
                return res.status(201).json(product);

                console.log('Product created successfully:', product);

            } catch (dbError) {
                return res.status(500).json({ message: dbError.message });
            }
           const subject = 'New Product Created';
            const text = `A new product has been created:\n\nName: ${name}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nSize: ${size}\nColor: ${color}`;
            await sendEmail('preciousonyenaucheya2004@gmail.com', subject, text);

        }  catch (error) {
        res.status(500).json({ message: error.message });
        }};


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