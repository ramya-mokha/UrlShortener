const mongoose = require("mongoose");
const User = require("./User");
const urlSchema = new mongoose.Schema(
  {
    url: String,
    shortCode: String,
    clicks: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
