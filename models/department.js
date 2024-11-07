const mongoose = require("mongoose");
const Faculty = require("./faculty");
const Examination = require("./examination");
const Resource = require("./resource");

const departmentSchema = new mongoose.Schema({
  departmentName: String,
  hod: String,
  contactEmail: String,
  courses: [String],
  faculty: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // Reference to the Faculty model
    },
  ],
  examination: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Examination",
    },
  ],
  resource: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Resource",
    }
  ]
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
