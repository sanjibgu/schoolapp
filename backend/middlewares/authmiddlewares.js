const jwt=require('jsonwebtoken')
const User=require('../models/UserModel')
const asyncHandler=require('express-async-handler')

const protect=asyncHandler(async(req,res,next)=>{

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      )
    {

        try {
                
                token = req.headers.authorization.split(" ")[1];
                const decoded=jwt.verify(token,process.env.JWT_SECRECT);

                req.user=await User.findById(decoded.id).select("-password")
                next()

        } catch (error) {
            res.status(400);
            throw new Error("Unauthorized token");
        }
    }

    if(!token){
        res.status(400);
        throw new Error("Unauthorized User");
    }
})

module.exports=protect