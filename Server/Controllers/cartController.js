import User from '../Schema/userSchema.js';

// Update User CartData
export const updateCart = async (req,res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.user.id;
        await User.findByIdAndUpdate(userId,{ cartItems });
        res.json({success : true,msg : 'Cart Updated'});
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}