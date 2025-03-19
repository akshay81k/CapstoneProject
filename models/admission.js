const mongoose = require("mongoose");
const admissionDetailsSchema = new mongoose.Schema({
  eligibilityCriteria: String,
  applicationDeadline: Date,
  admissionProcedure: String,
  feeStructure: [
    {
      year: String,
      category: String,
      applicability: String,
      tuitionFee: Number,
      developmentFee: Number,
      labFee: Number,
      examFee: Number,
      enrollmentFee: Number,
      actualFee: Number
    }
  ],
  contact: {
    name: String,
    email: String,
    phone: String
  }
});

const AdmissionDetail = mongoose.model(
  "AdmissionDetail",
  admissionDetailsSchema
);
module.exports = AdmissionDetail;
