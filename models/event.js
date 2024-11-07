const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  organizer: {
    type: [String],
    default: "Admin",
  },
  category: {
    type: String,
  },
  venue: {
    type: String,
  },

  imgs: {
    url: [String],
    fileName: [String],
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
