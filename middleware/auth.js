const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')

const auth = async (req, res, next) => {
    try {
        console.log('ji')
        const authHeader = req.header('Authorization');
        console.log(authHeader);
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     throw new Error('Authorization header is missing or malformed');
        // }

        const token = authHeader.replace('Bearer ', '');
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
