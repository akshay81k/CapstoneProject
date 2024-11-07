const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  department: {
    type: String,
  },
  designation: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  specialization: {
    type: String,
  },
  experience: {
    type: String,
  },
  date_of_joining: Date,
  photo: {
    url: String,
    fileName: String,
  },
});

const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
