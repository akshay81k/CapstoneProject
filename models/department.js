const mongoose = require("mongoose");
const Faculty = require("./faculty");
const Examination = require("./examination");
const Resource = require("./resource");

const departmentSchema = new mongoose.Schema({
  departmentName: String,
  hod: String,
  contactEmail: String,

  courses: [String],

  vision: String,
  mission: [String], // List of mission points

  programDetails: {
    intake: Number,
    duration: String,
  },

  scope: String, // Description about scope
  careerOpportunities: [String], // List of career opportunities

  departmentFeatures: [String], // List of features

  faculty: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty", // Reference to Faculty model
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
      ref: "Resource",
    },
  ],
});

departmentSchema.post("findOneAndDelete", async (department) => {
  if (department.faculty.length) {
    await Faculty.deleteMany({ _id: { $in: department.faculty } });
  }
  if (department.examination.length) {
    await Examination.deleteMany({ _id: { $in: department.examination } });
  }
  if (department.resource.length) {
    await Resource.deleteMany({ _id: { $in: department.resource } });
  }
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
