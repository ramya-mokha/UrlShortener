const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleSignUp = async (req, res) => {
  const userExisting = await User.findOne({ email: req.body.email });
  if (userExisting) {
    return res.json({ message: "user exists" });
  }
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashPassword;
  const user = await User.create(req.body);
  const userPayload = {
    userId: user._id,
    name: user.name,
  };
  const token = jwt.sign(userPayload, process.env.JWT_SECRET);
  res.cookie("token",token,{httpOnly:true});
  res.json({ message: "success"});
};

const handleLogin = async (req, res) => {
  const userExisting = await User.findOne({ email: req.body.email });
  if (userExisting) {
    const isMatch = await bcrypt.compare(
      req.body.password,
      userExisting.password,
    );
    console.log(isMatch);
    if (isMatch) {
      const userPayload = {
        userId: userExisting._id,
        name: userExisting.name,
      };
      const token = jwt.sign(userPayload, process.env.JWT_SECRET);
      res.cookie("token",token,{httpOnly:true});
      
      return res.json({ message: "success" });
    }
  }
  return res.json({ message: "invalid" });
};
const handleLogout=(req,res)=>{
  res.clearCookie("token",{
    httpOnly:true
  })
  return res.status(200).json({message:"Logged out successfully"})
}
module.exports.handleSignUp = handleSignUp;
module.exports.handleLogin = handleLogin;
module.exports.handleLogout=handleLogout;
