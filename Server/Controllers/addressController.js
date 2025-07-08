import Address from "../Schema/addressSchema.js";

// Add Address
export const addAddress = async (req,res) => {
    try {
        const { address } = req.body;
        const userId = req.user.id;
        await Address.create({...address,userId});
        res.json({success : true,msg : 'Address Added Successfully'})
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}

// Get Address 
export const getAddress = async (req,res) => {
    try {
        const userId = req.user.id;
        const address = await Address.find({ userId });
        res.json({success : true,address})
    } catch (err) {
        res.json({success : false,msg : err.message});
    }
}