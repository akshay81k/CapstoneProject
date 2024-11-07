const mongoose = require("mongoose");
const facilitySchema = new mongoose.Schema({
  facilityName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  contact: {
    name: String,
    email: String,
    phone: String,
  },
  img: {
    url: String,
    fileName: String,
  },
});

const Facility = mongoose.model("Facility", facilitySchema);
module.exports = Facility;
