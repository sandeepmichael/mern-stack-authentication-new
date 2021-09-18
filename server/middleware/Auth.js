const jwt = require('jsonwebtoken')

const requireLogin = (req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode;
            next();
        } else {
            res.status(400).json({error:"Unauthorized"})
        }
        
    } catch (err) {
        console.log('something went wrong')
    }
}
module.exports = requireLogin;