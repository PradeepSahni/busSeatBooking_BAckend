const { verify } = require("jsonwebtoken");
const db = require('../models/index');
const User = db.user;

require('dotenv').config();
const authMiddleWare = (req,res,next)=>{
    const authorization = req.get('Authorization');
    if(!authorization){
        return res.status(403).json({ success: false, message: "403 Unauthorized"});
    }
    let token  = authorization;
    verify(token,process.env.SECRET_KEY,async (err,decode)=>{
        if(err){
            // JsonWebTokenError  TokenExpiredError
            if(err.name!=undefined && err.name=='TokenExpiredError'){
                return res.status(403).json({ success: false, message: "Session expired.",error:err});
            }
            else{
                return res.status(401).json({ success: false, message: "Invalid token.",error:err});
            }
        }
        else{
            req.User = decode.result;
            next();
        }
    })
}

module.exports={
    authMiddleWare
}