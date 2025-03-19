const { date } = require("joi");
const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address:{
    type: String,
  },
  adharNo:{
    type:Number
  },
  date_of_birth:{
    type: Date,
  },
  qualification:{
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
