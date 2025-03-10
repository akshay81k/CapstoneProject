const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  //datePosted: { type: Date, default: Date.now },
  postedBy: {
    type: String,
    default: "Admin",
  },
  category: {
    type: String,
    required: true,
  },
});

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
