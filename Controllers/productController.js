const cloudinary  = require("../Config/cloudinary");
const Product = require("../Model/productModel");

const getCategoryProducts = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};



const addProduct = async (req, res) => {
  const { name, description, price, category } = req.body;

  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);

  if (!name || !description || !price || !category || !req.file) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return res.status(400).json({ message: 'Price must be a valid number' });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      name,
      description,
      price: numericPrice,
      category,
      image: result.secure_url, 
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
};


const getProductDetails = async(req,res)=>{
  try {
    const {productId} = req.params
    const productData = await Product.findById(productId)

    if(!productData){
      return res.status(404).json({ message:'product not found'})
    }

    res.json({message:'product details fetched', data: productData})
    
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}


const deleteProduct = async (req,res)=> {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', error });
  }
}


module.exports = { getCategoryProducts, addProduct, getProductDetails, deleteProduct };
