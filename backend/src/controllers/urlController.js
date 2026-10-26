const crypto = require("crypto");
const Url = require("../models/Url");
const ClickEvent = require("../models/ClickEvent");

const createShortcode = async (req, res) => {
  const link = req.body.link;
  let existingUrl = await Url.findOne({ url: link,userId:req.user.userId});
  const customAlias=req.body.customAlias?.trim();
  if(existingUrl){
    return res.json({message:"url already existing",data:existingUrl});
  }
 else{
    let rBytes='';
    if(customAlias){
      existingUrl=await Url.findOne({shortCode:customAlias});
      if(existingUrl){
        return res.json({message:'custom alias already existing ',data:null});
      }
      rBytes=customAlias;
    }
    else rBytes = crypto.randomBytes(4).toString("hex");
    const tags=req.body.tags.split(',');
    const newUrl=await Url.create({
      url: link,
      shortCode: rBytes,
      clicks:0,
      userId:req.user.userId,
      tags:tags
    });
    return res.json({message:'new Url created',data:newUrl});
  }
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
const calcTodaysClicks=async (req,res)=>{
        const startOfToday=new Date();
        startOfToday.setHours(0,0,0,0);
        const startOfTomorrow=new Date(startOfToday);
        startOfTomorrow.setDate(startOfToday.getDate()+1);
        const urls=await Url.find({
          userId:req.user.userId
        })
        if(!urls) return 0;
        const urlIds=urls.map(url=>(
            url._id
        ))
        const count = await ClickEvent.countDocuments({
          urlId:{$in:urlIds},
          createdAt:{
            $gte:startOfToday,
            $lt:startOfTomorrow
          }
        })
        return res.json({count:count});

}
module.exports.createShortCode = createShortcode;
module.exports.getMyUrls=getMyUrls;
module.exports.deleteUrl=deleteUrl;
module.exports.calcTodaysClicks=calcTodaysClicks;