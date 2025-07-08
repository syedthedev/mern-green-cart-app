import express from 'express';
import { addAddress,getAddress } from '../Controllers/addressController.js';
import userAuth from '../Middleware/userAuth.js';

const addressRouter = express.Router();

addressRouter.post('/add',userAuth,addAddress);
addressRouter.post('/get',userAuth,getAddress);

export default addressRouter;