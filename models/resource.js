const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  materials: [
    {
      textbookTitle: {
        type: String,
        required: true,
      },
      textbookURL: {
        url: {
          type: String,
        },
        fileName: {
          type: String,
        },
      },
      paperLinks: [
        {
          url: String,
          fileName: String,
        },
      ],
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;
