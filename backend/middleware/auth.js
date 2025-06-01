const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(403).json({error: 'Token Missing'});

    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch{
        res.status(403).json({error: 'Invalid Token'});
    }
};