import express from 'express';
import { updateCart } from '../Controllers/cartController.js';
import userAuth from '../Middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post('/update',userAuth,updateCart);

export default cartRouter;