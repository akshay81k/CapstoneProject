const mongoose = require("mongoose");

const committeeSchema = new mongoose.Schema({
  committeeName: {
    type: String,
    required: true,
  },
  members: [
    {
      name: String,
      role: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
});

const Committee = mongoose.model("Committee", committeeSchema);
module.exports = Committee;
