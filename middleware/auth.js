const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        console.log(authHeader);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'NekoGift');
        
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not found');
        }

        req.token = token;
        req.user = user;
        console.log('ok')
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate properly' });
    }
};

module.exports = auth;
