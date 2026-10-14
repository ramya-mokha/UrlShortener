const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected");
    }
    catch(error){
        console.error(error.message);
    }
}
module.exports=connectDB;