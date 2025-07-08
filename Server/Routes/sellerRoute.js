import express from 'express';
import { sellerLogin,isSellerAuth,sellerLogout } from '../Controllers/sellerController.js';
import sellerAuth from '../Middleware/sellerAuth.js';

const sellerRouter = express.Router();

sellerRouter.post('/login',sellerLogin);
sellerRouter.get('/is-auth',sellerAuth,isSellerAuth);
sellerRouter.get('/logout',sellerLogout);

export default sellerRouter;