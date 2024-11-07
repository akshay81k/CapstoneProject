const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  studentName: {
    type: [String],
  },
  graduationYear: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  projectDetails: {
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["in progress", "completed", "archived"],
    },
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
