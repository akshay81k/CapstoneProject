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

const initDb = async () => {
  // await Notice.deleteMany({});
  // // initData.data = initData.data.map((obj) => ({...obj, owner:'668684b0e882c26540ec8003'}));
  // await Notice.insertMany(initData.data);

  // await Event.deleteMany({});
  // await Event.insertMany(initEvent.data);

  await Ranker.deleteMany({});
  await Ranker.insertMany(initRanker.data);

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
  console.log("Data was initialized");
};

initDb();
