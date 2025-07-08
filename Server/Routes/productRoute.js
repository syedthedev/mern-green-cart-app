import express from 'express';
import { upload } from '../Helper/Multer.js';
import sellerAuth from '../Middleware/sellerAuth.js';
import { addProduct, changeStock, productById, productList } from '../Controllers/productController.js';


const productRouter = express.Router();

productRouter.post('/add',upload.array(["images"]),sellerAuth,addProduct);
productRouter.get('/list',productList);
productRouter.get('/id',productById);
productRouter.post('/stock',sellerAuth,changeStock);

export default productRouter;