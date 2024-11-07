const mongoose = require("mongoose");
const admissionDetailsSchema = new mongoose.Schema({
  eligibilityCriteria: String,
  applicationDeadline: Date,
  admissionProcedure: String,
  feeStructure: {
    categories: [
      {
        category: String,
        fee: Number,
        paymentMode: String,
        remarks: String,
      },
    ],
  },
  contact: {
    name: String,
    email: String,
    phone: String,
  },
});

const AdmissionDetail = mongoose.model(
  "AdmissionDetail",
  admissionDetailsSchema
);
module.exports = AdmissionDetail;
