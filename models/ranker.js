const mongoose = require("mongoose");

const rankerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  year: {
    type: String,
  },
  department: {
    type: String,
  },
  percentage: {
    type: Number,
  },
  photo: {
    url: String,
    fileName: String,
  },
});

const Ranker = mongoose.model("Ranker", rankerSchema);
module.exports = Ranker;
