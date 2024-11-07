const mongoose = require("mongoose");

const examinationSchema = new mongoose.Schema({
  examName: {
    type: String,
  },
  examType: {
    type: String,
  },
  department: {
    type: String,
  },
  semester: {
    type: Number,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  timetable: {
    url: String,
    fileName: String,
  },
});

const Examination = mongoose.model("Examination", examinationSchema);
module.exports = Examination;
