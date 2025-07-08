import Order from "../Schema/orderSchema.js";
import Product from "../Schema/productSchema.js";
import stripe, { Stripe } from 'stripe';
import User from "../Schema/userSchema.js";

// Place Order COD

export const placeOrderCOD = async (req,res) => {
    try {
        const userId = req.user.id;
        const { items,address } = req.body;
        if(!address || items.length === 0){
            return res.json({success : false,msg : 'Invalid Data'})
        }

        // calculate amount
        let amount = await items.reduce(async (acc,item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        // Add Tax
        amount += Math.floor(amount * 0.2);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType : 'COD'
        });
        return res.json({success : true,msg : 'Order Placed Successfully'});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}

// Place Order Stripe

export const placeOrderStripe = async (req,res) => {
    try {
        const userId = req.user.id;
        const { items,address } = req.body;
        const { origin } = req.headers;
        if(!address || items.length === 0){
            return res.json({success : false,msg : 'Invalid Data'})
        }

        let productData = [];


        // calculate amount
        let amount = await items.reduce(async (acc,item) => {
            const product = await Product.findById(item.product);
            productData.push({ 
                name : product.name,
                price : product.offerPrice,
                quantity : item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        // Add Tax
        amount += Math.floor(amount * 0.2);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType : 'Online'
        });

        // Stripe Gateway
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        // create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data : {
                    currency : "usd",
                    product_data : {
                        name : item.name
                    },
                    unit_amount : Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity : item.quantity,
            }
        })
        // create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode : "payment",
            success_url : `${origin}/loader?next=my-orders`,
            cancel_url : `${origin}/cart`,
            metadata : {
                orderId : order._id.toString(),
                userId,
            }
        })
        
        return res.json({success : true,url : session.url});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}

// Sripe Webhooks to Verify Payments Acion

export const stripeWebhooks = async (req,res) => {
    // Stripe gateway
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );


    } catch (err) {
        res.status(400).send(`Webhook Error : ${err.message}`);
    }

    // Handle The Event
    switch(event.type){
        case "payment_intent.succeeded":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // session metadata 
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent : paymentIntentId,
            });

            const { orderId,userId } = session.data[0].metadata;

            // Payment Paid
            await Order.findByIdAndUpdate(orderId,{ isPaid : true});
            // Clear car data
            await User.findByIdAndUpdate(userId,{cartItems : {}});

            break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // session metadata 
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent : paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
        default:
            console.error(`Unhandled event type : ${event.type}`);
            break;
    }
    res.json({received : true});
}

// Get Orders By UserId
export const getUserOrders = async (req,res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({
            userId,
            $or: [{paymentType : 'COD'},{isPaid : true}]
        }).populate("items.product address").sort({ createdAt : -1});
        res.json({success : true,orders});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}

// Get All Orders (for seller / admin)
export const getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find({
            $or: [{paymentType : 'COD'},{isPaid : true}]
        }).populate("items.product address").sort({ createdAt : -1});
        res.json({success : true,orders});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}
