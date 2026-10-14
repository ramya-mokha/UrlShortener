const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
const jwt=require("jsonwebtoken")
const User = require('../models/User');
router.post("/signup",authController.handleSignUp);
router.post('/logout',authController.handleLogout);
router.post("/login",authController.handleLogin);
router.get('/me',async (req,res)=>{
    const token=req.cookies.token;
    console.log(req.cookies.token);
    if(!token){
        return res.status(401).json({message:"user not authenticated"})
    }
    try{
        const userPayload=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(userPayload.userId).select("name email");
        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }
        return res.status(200).json({user})
    }
    catch(error){
        res.status(401).json({message:"invalid or a expired token"})
    }
})
module.exports=router;
