const jwt=require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Authentication required"})
    }
    try{
        const userPayload=jwt.verify(token,process.env.JWT_SECRET);
        
        req.user=userPayload;
        console.log(req.user);
        next();
    }
    catch{
         res.json({message:"Error"});
    }
}
module.exports.authMiddleware=authMiddleware;