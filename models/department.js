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
  departmentalAdvisoryBoard: [
    {
      name: String, // Name of the member
      designation: String, // Designation of the member
      role: String, // Role in DAB (e.g., Chairman, Member, Parent, Alumni)
    },
  ],
  programEducationalObjectives: [String], // List of PEOs

  programOutcomes: [
    {
      title: String, // Example: "PO 1. Basic knowledge"
      description: String, // Example: "Apply knowledge of mathematics..."
    },
  ],

  programSpecificOutcomes: [
    {
      title: String, // Example: "PSO 1. Computer Software and Hardware Usage"
      description: String, // Example: "Use state-of-the-art technologies..."
    },
  ],
  syllabus: [
    {
      semester: Number, // e.g., 1, 2, 3, 4, 5, 6
      fileName: String, // e.g., "syllabus_sem1.pdf"
      fileUrl: String, 
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
