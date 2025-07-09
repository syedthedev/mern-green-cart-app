import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import url from 'url';
import userRouter from './Routes/userRoute.js';
import sellerRouter from './Routes/sellerRoute.js';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoute.js';
import addressRouter from './Routes/addressRouter.js';
import { stripeWebhooks } from './Controllers/orderController.js';
import connectCloudinary from './Helper/Cloudinary.js';
import dotenv from 'dotenv';
dotenv.config();


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;
const app = express();

// Database Connection
mongoose.connect(`${process.env.MONGODB_URL}/greencart`)
        .then(() => console.log('Connected To Database'))
        .catch(() => console.log('Not Connected'));

// Cloudinary        
await connectCloudinary();

// Origin
const allowedOrigins = ['https://mern-green-cart-app-frontend.vercel.app','http://localhost:5173'];

// Cors
app.use(cors({origin : allowedOrigins,credentials : true}));

// Stripe
app.post('/stripe',express.raw({type  : "application/json"}),stripeWebhooks);

// Body-Parser 
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Cookie-Parser
app.use(cookieParser());

// Routes
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'Public','Home.html'));
});

app.use('/api/user',userRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);

app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`));