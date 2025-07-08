import jwt from 'jsonwebtoken';

// Login
export const sellerLogin = async (req,res) => {
    const { email,password } = req.body;
   try {
     if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
        const token = jwt.sign({email},process.env.JWT_SECRET,{ expiresIn : '7d'});
        res.cookie('sellerToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({success : true,msg : 'Logged In'});
    }else{
        return res.json({success : false,msg : 'Invalid Credentials'});
    }
   } catch (err) {
    res.json({ success: false, msg: err.message });
   }
}

// Check Seller Auth 
export const isSellerAuth = async (req,res) => {
    try {
        return res.json({success : true});
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
}

// Logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        });
        res.json({ success: true, msg: 'Logged Out' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};