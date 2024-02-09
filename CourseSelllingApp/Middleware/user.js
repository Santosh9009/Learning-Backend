const jwt= require('jsonwebtoken')
const {jwtPassword} = require("../db")

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
        const token = authHeader.split(' ')[1];
        try {
            // Assuming jwtPassword is defined somewhere in your code
            jwt.verify(token, jwtPassword);
            next();
        } catch (error) {
            res.status(403).json({
                message: `Admin authentication failed`
            });
        }
    } else {
        res.status(401).json({
            message: 'Authorization header is missing or invalid'
        });
    }
}

module.exports = userMiddleware;