import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Create New Product
// @route   POST /api/product
// @access  Authenticated
const createProduct = expressAsyncHandler(async (req, res) => {
    const { name, sku, description, category, imageURL, userId } = req.body;
    const source = req.user.isAdmin ? "ADMIN" : "USER";
  
    const product = await Product.create({
      name,
      sku,
      description,
      category,
      source,
      imageURL,
      userId
    });
  
  
    res.status(201).json({
        _id: product._id,
        name: product.name,
        sucess: true,
    });
   
  });


// @desc    Get All Product
// @route   POST /api/product
// @access  Authenticated
const getAllProducts = expressAsyncHandler(async (req, res) => {
  let products = [];

  if(req.user.isAdmin){
    products = await Product.find();
  }
  else{
    products = await Product.find({userId:req.user._id})
  }


  res.status(201).json({
      products:products,
      sucess: true,
  });
 
});

// @desc    Get  Product
// @route   POST /api/product
// @access  Authenticated
const getProduct = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  if(id){

    const product = await Product.findById(id);

    res.status(201).json({
      product:product,
      sucess: true,
  });

  }else{

    
    res.status(401);
    throw new Error('Product Id Not Found.');

  }

 
});


// @desc     Delete Product
// @route   POST /api/product
// @access  Authenticated
const deleteProduct = expressAsyncHandler(async (req, res) => {

  const id = req.params.id;

  if(id){
    await Product.findByIdAndDelete(id)
      
    res.status(201).json({
          sucess: true,
          message:"Product Deleted Successfully."
      });
  }
  else{
    res.status(401);
    throw new Error('Product Id Not Found.');
  }
 
});

const updateProduct = expressAsyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if(req.user._id !== product.userId && !req.user.isAdmin ){
    res.status(401);
    throw new Error(' Not Autorized To Access This Product');
  }

  if (product) {
    product.name = req.body.name || product.name;
    product.sku = req.body.sku || product.sku;
    product.description = req.body.description || product.email;
    product.category = req.body.category || product.isAdmin;
    product.source = req.body.source || product.isAdmin;
    product.imageURL = req.body.imageURL || product.isAdmin;
    product.userId = req.body.userId || product.userId;

    const updatedUser = await product.save();

    res.status(201).json({
      sucess: true,
      message:"Product Updated Successfully."
    });
  }
  else{
    res.status(401);
    throw new Error('Product Id Not Found.');
  }
 
});

export {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProduct
}


