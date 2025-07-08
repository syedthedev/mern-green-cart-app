import express from 'express';
import { register,login,logout, isAuth } from "../Controllers/userController.js"; 
import userAuth from '../Middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/logout',logout);
userRouter.get('/is-auth',userAuth,isAuth);

export default userRouter;