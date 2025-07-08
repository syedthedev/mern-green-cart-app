import express from 'express';
import userAuth from '../Middleware/userAuth.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../Controllers/orderController.js';
import sellerAuth from '../Middleware/sellerAuth.js';

const orderRouter = express.Router();

orderRouter.post('/cod',userAuth,placeOrderCOD);
orderRouter.post('/stripe',userAuth,placeOrderStripe);
orderRouter.get('/user',userAuth,getUserOrders);
orderRouter.get('/seller',sellerAuth,getAllOrders);

export default orderRouter;