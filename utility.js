const jwt = require('jsonwebtoken');
const isAuth = (req, res, next) => {
    console.log('Inside isAuth');
   const authorization = req.headers.authorization;
   if (authorization) {
     const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
     jwt.verify(
       token,
       process.env.JWT_SECRET || 'somethingsecret',
       (err, decode) => {
         if (err) {
           res.status(401).send({ message: 'Invalid Token' });
         } else {
           req.user = decode;
           next();
         }
       }
     );
   } else {
       console.log('No Token passed')
     res.status(401).send({ message: 'No Token' });
   }
 };
 module.exports = isAuth;