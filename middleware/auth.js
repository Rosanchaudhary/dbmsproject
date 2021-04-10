const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
    console.log(req.cookies["x-auth-token"]);
    //get the token from header if present
    const token = req.cookies["x-auth-token"] || req.headers["authorization"];
    //if token not found return response without going to next middleware
    if(!token) return res.status(401).redirect('users');
   
    try{
        console.log("this is token:"+token);
        //if can verify token ,set req.user and pass to next middleware
        const decoded = jwt.verify(token,"mySecureKey");
        console.log("this is decoded:"+decoded);
        req.user = decoded;
        next();
    }
    catch{
        //if invalid token
        res.status(400).send("Invalid token.");
    }
}