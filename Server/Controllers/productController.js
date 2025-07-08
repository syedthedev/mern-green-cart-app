import Product from '../Schema/productSchema.js';
import { v2 as cloudinary } from 'cloudinary';

// Add Product
export const addProduct = async (req,res) => {
    try {
        const  productData  = JSON.parse(req.body.productData);
        const images = req.files
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type : 'image'});
                return result.secure_url
            })
        )
        await Product.create({...productData,image : imageUrl});
        res.json({success : true,msg : 'Product Added'});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}

// Get Product
export const productList = async (req,res) => {
    try {
        const products = await Product.find({});
        res.json({success : true,products});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}

// Get Single Product
export const productById = async (req,res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({success : true,product});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}

// Change Product inStock
export const changeStock = async (req,res) => {
    try {
        const { id,inStock } = req.body;
        await Product.findByIdAndUpdate(id,{ inStock });
        res.json({success : true,msg : 'Stock Updated'});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}
