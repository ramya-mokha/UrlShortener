const express=require("express");
const connectDB = require("./src/config/db");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
const urlRouter=require('./src/routes/urlRoutes');
const authRouter=require('./src/routes/authRoutes')
const Url=require('./src/models/Url');
const { authMiddleware } = require("./src/middleware/authMiddleware");

const port=3000;
app.use(cookieParser());
dotenv.config();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use("/api/urls",urlRouter);
app.use("/api/auth",authRouter);

app.get('/',(req,res)=>{
    res.send(req.body)
})
app.get('/:shortLink',authMiddleware,async (req,res)=>{
    const existingUrl=await Url.findOneAndUpdate({shortCode:req.params.shortLink,userId:req.user.userId},{$inc:{clicks:1}});
    res.redirect(existingUrl.url);
})
connectDB();

app.listen(port,()=>{
    console.log("listening on port 3000")
})