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
