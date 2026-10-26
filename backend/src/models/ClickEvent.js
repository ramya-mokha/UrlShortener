const mongoose=require('mongoose');
const ClickEventSchema=new mongoose.Schema({
    urlId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Url',
        required:true,
    }
},{
    timestamps:true
})
const ClickEvent=mongoose.model('ClickEvent',ClickEventSchema);
module.exports=ClickEvent;