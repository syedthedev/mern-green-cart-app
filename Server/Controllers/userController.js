import User from '../Schema/userSchema.js';
import jwt from 'jsonwebtoken';
import { hashPassword,comparePassword } from '../Helper/Helper.js';

// Register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, msg: 'Missing details' });
    }

    try {
        const existUser = await User.findOne({ email });
        if (existUser) return res.json({ success: false, msg: 'User already exists' });

        const hash_pass = await hashPassword(password);
        const user = new User({ name, email, password: hash_pass });
        const saveUser = await user.save();

        const token = jwt.sign({ id: saveUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true, user : { email : saveUser.email,name : saveUser.name } });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, msg: 'Email and Password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, msg: 'User not found!' });

        const isMatch = await  comparePassword(password, user.password);
        if (!isMatch) return res.json({ success: false, msg: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

       res.json({ success: true, user : { email : user.email,name : user.name } });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict'
        });
        res.json({ success: true, msg: 'Logged Out' });
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
};

// Check Auth 
export const isAuth = async (req,res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.json({success : true,user});
    } catch (err) {
        res.json({ success: false, msg: err.message });
    }
}

