const crypto = require("crypto");
const Url = require("../models/Url");

const createShortcode = async (req, res) => {
  const link = req.body.link;
  const existingUrl = await Url.findOne({ url: link,userId:req.user.userId});

  if (existingUrl == null) {
    const rBytes = crypto.randomBytes(4).toString("hex");
    const newUrl=await Url.create({
      url: link,
      shortCode: rBytes,
      clicks:0,
      userId:req.user.userId
    });
    return res.json(newUrl);
  }
  res.json(existingUrl);
};

const getMyUrls=async(req,res)=>{
    const urls=await Url.find({userId:req.user.userId})
    console.log(urls)
    res.json(urls);
}
const deleteUrl=async(req,res)=>{
  console.log(req.body.shortCode)
    const deleteCnt=await Url.deleteOne({shortCode:req.body.shortCode,userId:req.user.userId});
    console.log("deleted");
    console.log(deleteCnt);
    res.json({message:"deleted"});
}
module.exports.createShortCode = createShortcode;
module.exports.getMyUrls=getMyUrls;
module.exports.deleteUrl=deleteUrl;
