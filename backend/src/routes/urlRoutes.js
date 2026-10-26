const express=require("express");
const urlController=require("../controllers/urlController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/User");
const router=express.Router();
router.get('/getMyUrls',authMiddleware,urlController.getMyUrls)
router.post('/submit',authMiddleware,urlController.createShortCode
)
router.post('/delete',authMiddleware,urlController.deleteUrl
)
router.get('/getTodaysClicks',authMiddleware,urlController.calcTodaysClicks);

module.exports=router;