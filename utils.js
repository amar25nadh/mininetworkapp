const jwt = require('jsonwebtoken');
// import jwt from 'jsonwebtoken';
 const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            name: user.name,
            email: user.email,
     
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    );
};


module.exports = generateToken;

