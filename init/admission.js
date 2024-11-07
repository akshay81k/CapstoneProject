const admissionDetails = {
  eligibilityCriteria: "10th Grade with a minimum of 50% marks",
  applicationDeadline: new Date("2024-05-15"),
  admissionProcedure:
    "Candidates must fill out the online application form, followed by an entrance exam and an interview.",
  feeStructure: {
    categories: [
      {
        category: "OPEN",
        fee: 66200,
        paymentMode: "Demand Draft",
        remarks: "Payment to be made in full",
      },
      {
        category: "OBC/EBC/EWS",
        fee: 36520,
        paymentMode: "Demand Draft",
        remarks: "Payment to be made in full",
      },
      {
        category: "SBC/SC/ST/VJ/NT/DT",
        fee: 6840,
        paymentMode: "Demand Draft",
        remarks: "Payment to be made in full",
      },
      {
        category: "TFWS",
        fee: 6840,
        paymentMode: "Demand Draft",
        remarks: "Payment to be made in full",
      },
    ],
  },
  contact: {
    name: "Dr. Aditi Sharma",
    email: "admissions@bvpolytechnic.edu.in",
    phone: "9876543210",
  },
};
module.exports = { data: admissionDetails };
