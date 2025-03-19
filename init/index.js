const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/CapstoneProject";
const initData = require("./notices.js");
const Notice = require("../models/notice.js");
const initEvent = require("./event.js");
const Event = require("../models/event.js");
const Ranker = require("../models/ranker.js");
const initRanker = require("./ranker.js");
const Department = require("../models/department.js");
const initDepartment = require("./department.js");
const Facility = require("../models/facility.js");
const initFacility = require("./facility.js");
const Committee = require("../models/committee.js");
const initCommittee = require("./committee.js");
const AdmissionDetail = require("../models/admission.js");
const initAdmission = require("./admission.js");
const Faculty = require("../models/faculty.js");
const initFaculty = require("./faculty.js");
const initProject = require("./project.js");
const Project = require("../models/project.js");

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// const initDb = async () => {
  // await Notice.deleteMany({});
  // // initData.data = initData.data.map((obj) => ({...obj, owner:'668684b0e882c26540ec8003'}));
  // await Notice.insertMany(initData.data);

  // await Event.deleteMany({});
  // await Event.insertMany(initEvent.data);

  // await Ranker.deleteMany({});
  // await Ranker.insertMany(initRanker.data);

  // await Department.deleteMany({});
  // await Department.insertMany(initDepartment.data);

  // await Facility.deleteMany({});
  // await Facility.insertMany(initFacility.data);

  // await Committee.deleteMany({});
  // await Committee.insertMany(initCommittee.data);

  // await AdmissionDetail.deleteMany({});
  // await AdmissionDetail.insertMany(initAdmission.data);

  // await Faculty.deleteMany({});
  // await Faculty.insertMany(initFaculty.data);

  // await Project.deleteMany({});
  // await Project.insertMany(initProject.data);


// initDb();

  // ✅ Hardcoded Update Data
  const admissionDetailsData = {
    eligibilityCriteria: "10th Grade with a minimum of 50% marks",
    applicationDeadline: new Date("2025-06-30"),
    admissionProcedure: "Candidates must fill out the online application form, followed by an entrance exam and an interview.",
    feeStructure: [
      {
        year: "SY/TY (FY-X. STD)",
        category: "OPEN / INSTITUTE LEVEL / NON-CAP",
        applicability: "BOYS / GIRLS",
        tuitionFee: 59360,
        developmentFee: 5640,
        examFee: 1200,
        enrollmentFee: 0,
        labFee: 0,
        actualFee: 66200
      },
      {
        year: "SY/TY (FY-X. STD)",
        category: "OBC / EBC / EWS / SEBC",
        applicability: "BOYS",
        tuitionFee: 29680,
        developmentFee: 5640,
        examFee: 1200,
        enrollmentFee: 0,
        labFee: 0,
        actualFee: 36520
      },
      {
        year: "SY/TY (FY-X. STD)",
        category: "OBC / EBC / EWS / SEBC",
        applicability: "GIRLS",
        tuitionFee: 0,
        developmentFee: 5640,
        examFee: 0,
        enrollmentFee: 0,
        labFee: 0,
        actualFee: 5640
      },
      {
        year: "SY/TY (FY-X. STD)",
        category: "ST / SC / VJ-DT / NT-1,2,3 / TFWS",
        applicability: "BOYS / GIRLS",
        tuitionFee: 0,
        developmentFee: 5640,
        examFee: 1200,
        enrollmentFee: 0,
        labFee: 0,
        actualFee: 6840
      },
      {
        year: "FY / SY (DSD) (2024-25)",
        category: "OPEN / INSTITUTE LEVEL / NON-CAP",
        applicability: "BOYS / GIRLS",
        tuitionFee: 67992,
        developmentFee: 6799,
        examFee: 1200,
        enrollmentFee: 210,
        labFee: 0,
        actualFee: 76201
      },
      {
        year: "FY / SY (DSD) (2024-25)",
        category: "OBC / EBC / EWS / SEBC",
        applicability: "BOYS",
        tuitionFee: 33996,
        developmentFee: 6799,
        examFee: 1200,
        enrollmentFee: 210,
        labFee: 0,
        actualFee: 42205
      },
      {
        year: "FY / SY (DSD) (2024-25)",
        category: "OBC / EBC / EWS / SEBC",
        applicability: "GIRLS",
        tuitionFee: 0,
        developmentFee: 6799,
        examFee: 0,
        enrollmentFee: 210,
        labFee: 0,
        actualFee: 7009
      },
      {
        year: "FY / SY (DSD) (2024-25)",
        category: "ST / SC / VJ-DT / NT-1,2,3 / TFWS",
        applicability: "BOYS / GIRLS",
        tuitionFee: 0,
        developmentFee: 6799,
        examFee: 1200,
        enrollmentFee: 210,
        labFee: 0,
        actualFee: 8209
      }
    ],
    contact: {
      name: "Admissions Office",
      email: "admissions@institute.com",
      phone: "+91-9876543210"
    }
  };

  // ✅ Function to Update the Department
  async function updateDepartment() {
    try {
      const result = await AdmissionDetail.findByIdAndUpdate(
        new mongoose.Types.ObjectId("6725d81a1486dfdf567dc288"), // Ensure it's a valid ObjectId
        { $set: admissionDetailsData },  // Update the fields
        { new: true, upsert: false } // Return updated document, don't insert if missing
    );
        if (result) {
            console.log("✅ admission updated successfully:", result);
        } else {
            console.log("⚠️ admission not found.");
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error updating department:", error);
    }
  }

  // ✅ Run the Update Function
  updateDepartment();