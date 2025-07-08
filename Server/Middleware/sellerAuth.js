import jwt from 'jsonwebtoken';

const sellerAuth = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, msg: 'Unauthorized. Please log in.' });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decoded.email === process.env.SELLER_EMAIL) {
      req.seller = decoded;
      next();
    } else {
      return res.status(403).json({ success: false, msg: 'Forbidden: Invalid seller credentials.' });
    }
  } catch (err) {
    return res.status(401).json({ success: false, msg: 'Token expired or invalid.' });
  }
};

export default sellerAuth;
