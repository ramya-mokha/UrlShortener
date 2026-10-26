const mongoose = require("mongoose");
const User = require("./User");
const urlSchema = new mongoose.Schema(
  {
    url: String,
    shortCode:{
      type:String,
      unique:true,
    },
    clicks: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags:[]
  },
  {
    timestamps: true,
  },
);
const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
