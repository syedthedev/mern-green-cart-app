import Order from "../Schema/orderSchema.js";
import Product from "../Schema/productSchema.js";
import User from "../Schema/userSchema.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order with COD
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, msg: "Invalid order data" });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error("Product not found");
      amount += product.offerPrice * item.quantity;
    }
    amount += Math.floor(amount * 0.02); // Add 2% tax

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, msg: "Order placed successfully" });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

// Place Order with Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, msg: "Invalid order data" });
    }

    let amount = 0;
    const line_items = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) throw new Error("Product not found");

      const taxIncludedPrice = product.offerPrice + product.offerPrice * 0.02;
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.floor(taxIncludedPrice * 100),
        },
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02); // Add 2% tax

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

// Stripe Webhook for Payment Events
export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, // rawBody must be passed via express middleware
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    const paymentIntent = event.data.object;

    if (!paymentIntent) {
      return res.status(400).json({ success: false, msg: "No payment intent found" });
    }

    const sessionList = await stripe.checkout.sessions.list({
      payment_intent: paymentIntent.id,
    });

    const session = sessionList.data[0];
    const { orderId, userId } = session.metadata;

    if (event.type === "payment_intent.succeeded") {
      await Order.findByIdAndUpdate(orderId, { isPaid: true });
      await User.findByIdAndUpdate(userId, { cartItems: {} });
    }

    if (event.type === "payment_intent.payment_failed") {
      await Order.findByIdAndDelete(orderId);
    }

    res.json({ received: true });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};

// Get All Orders (Admin/Seller)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
};
