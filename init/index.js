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

  // // ✅ Function to Update the Department
  // async function updateDepartment() {
  //   try {
  //     const result = await AdmissionDetail.findByIdAndUpdate(
  //       new mongoose.Types.ObjectId("6725d81a1486dfdf567dc288"), // Ensure it's a valid ObjectId
  //       { $set: admissionDetailsData },  // Update the fields
  //       { new: true, upsert: false } // Return updated document, don't insert if missing
  //   );
  //       if (result) {
  //           console.log("✅ admission updated successfully:", result);
  //       } else {
  //           console.log("⚠️ admission not found.");
  //       }

  //       mongoose.connection.close();
  //   } catch (error) {
  //       console.error("❌ Error updating department:", error);
  //   }
  // }

  // // ✅ Run the Update Function
  // updateDepartment();




//   const updateData = {
//     departmentalAdvisoryBoard: [
//       { name: "Mr. Nagnath B. Kavhale", designation: "Principal", role: "Chairman" },
//       { name: "Mr. P. R. Vaghela", designation: "In charge HOD", role: "Member" },
//       { name: "Mrs. S. S Kasbe", designation: "Lecture", role: "Member" },
//       { name: "Mrs. S . S Kaimal", designation: "Lecture", role: "Member" },
//       { name: "Mr. P. G. Mhatre", designation: "–", role: "Parent" },
//       { name: "Mr. Rudra Trivedi", designation: "Student", role: "Alumni" }
//     ],
  
//     programEducationalObjectives: [
//       "Provide socially responsible, environment friendly solutions to Computer engineering related broad-based problems adapting professional ethics.",
//       "Adapt state-of-the-art Computer engineering broad-based technologies to work in multi-disciplinary work environments.",
//       "Solve broad-based problems individually and as a team member communicating effectively in the world of work."
//     ],
  
//     programOutcomes: [
//       { title: "PO 1. Basic knowledge", description: "Apply knowledge of basic mathematics, sciences and basic engineering to solve the broad-based Computer engineering problem." },
//       { title: "PO 2. Discipline knowledge", description: "Apply Computer engineering discipline – specific knowledge to solve core computer engineering related problems." },
//       { title: "PO 3. Experiments and practice", description: "Plan to perform experiments and practices to use the results to solve broad-based Computer engineering problems." },
//       { title: "PO 4. Engineering tools", description: "Apply relevant Computer technologies and tools with an understanding of the limitations." },
//       { title: "PO 5. The engineer and society", description: "Assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to practice in field of Computer engineering." },
//       { title: "PO 6. Environment and sustainability", description: "Apply Computer engineering solutions also for sustainable development practices in societal and environmental contexts and demonstrate the knowledge and need for sustainable development." },
//       { title: "PO 7. Ethics", description: "Apply ethical principles for commitment to professional ethics, responsibilities and norms of the practice also in the field of Computer engineering." },
//       { title: "PO 8. Individual and team work", description: "Function effectively as a leader and team member in diverse/multidisciplinary teams." },
//       { title: "PO 9. Communication", description: "Communicate effectively in oral and written form." },
//       { title: "PO 10. Life-long learning", description: "Engage in independent and life-long learning activities in the context of technological changes in the Computer engineering field and allied industry." }
//     ],
  
//     programSpecificOutcomes: [
//       { title: "PSO 1. Computer Software and Hardware Usage", description: "Use state-of-the-art technologies for operation and application of computer software and hardware." },
//       { title: "PSO 2. Computer Engineering Maintenance", description: "Maintain computer engineering related software and hardware systems." }
//     ],
  
//     syllabus: [
//       { semester: 1, fileName: "sem-1st-computer-engg-i-scheme-syllabus.pdf", fileUrl: "https://drive.google.com/file/d/1A0v_Is1zSv02Uu0FHYoWJTOBzbIVpc3M/view?usp=sharing" },
//       { semester: 2, fileName: "sem-2nd-computer-engg-i-scheme-syllabus.pdf", fileUrl: "https://drive.google.com/file/d/1PjixwkUn7YBNl5UoUBpbbFcF0ikJ9PWX/view?usp=sharing" },
//       { semester: 3, fileName: "sem-3rd-computer-engg-i-scheme-syllabus.pdf", fileUrl: "https://drive.google.com/file/d/1ItIkborOj_PW7sYDOZ5H1Hi16cUV84m3/view?usp=sharing" },
//       { semester: 4, fileName: "sem-4th-computer-engg-i-scheme-syllabus.pdf", fileUrl: "https://drive.google.com/file/d/1AEksUaJ7S_pe3Xr08Hgph7NTOUq2AAs3/view?usp=sharing" },
//       { semester: 5, fileName: "sem-5th-computer-engg-i-scheme-syllabus.pdf", fileUrl: "https://drive.google.com/file/d/1vEc64wen20lkYI3tHfgpSAdrARhl6vB6/view?usp=sharing" },
//       { semester: 6, fileName: "sem-6th-computer-engg-i-scheme-syllabus.pdf", fileUrl: "https://drive.google.com/file/d/1cySsSltMCjP-MI1DCZZuD3WblWoPgSRb/view?usp=sharing" }
//     ]
//   };
  
// // Usage in MongoDB update query
// const updateDepartment = async (departmentId) => {
//   try {
//     const result = await Department.findByIdAndUpdate(
//       departmentId,
//       { $set: updateData },
//       { new: true, runValidators: true }
//     );
//     console.log("Department updated successfully:", result);
//   } catch (error) {
//     console.error("Error updating department:", error);
//   }
// };

  // updateDepartment("672b99d211de1191359bb313");



  const committeeData = [
    {
      committeeName: "Anti-Ragging Committee",
      description: "Following Anti Ragging and Discipline Committee has been formed for Academic Year 2022-23, 2023-24, 2024-25. The committee shall plan and carry out the work.",
      members: [
        { name: "Prof. Mr. Parvez Vaghela", role: "Chairman" },
        { name: "Prof. Mrs. S. A. Kulkarni", role: "Teaching Member" },
        { name: "Prof. Mr. Y. A. Mahajan", role: "Teaching Member" },
        { name: "Mr. John Rodrigues", role: "Non-Teaching Member" },
        { name: "Mrs. Jayashree Bahadkar", role: "Non-Teaching Member" },
        { name: "Mr. Sagar Gawad", role: "Teaching Member" },
        { name: "Mrs. Geeta Gonsalves", role: "Parent" },
        { name: "Ms. Naysa Gonsalves", role: "Student(FYCO)" },
        { name: "Mr. Reyan Dabre", role: "Student(FYCO)" },
        { name: "Representative of Manikpur Police Station", role: "Police" },
        { name: "Mrs. Aditi Joshi", role: "N.G.O" },
        { name: "Mr. Suhas Birhade", role: "Media" }
      ]
    },
    {
      committeeName: "Discipline Committee",
      description: "Following Discipline Committee has been formulated for Academic Year 2022-23, 2023-24, 2024-25. The committee shall plan and carry out the work.",
      members: [
        { name: "Mr. V. K. Sonarkar", role: "Chairman" },
        { name: "Mr. V. N. Joshi", role: "Member" },
        { name: "Mr. H. M. Bhosale", role: "Member" },
        { name: "Mr. R. K. Garud", role: "Member" },
        { name: "Mr. S. S. Kasbe", role: "Member" },
        { name: "Mr. S. D. Mhatre", role: "Member" },
        { name: "Mr. B. S. Meher", role: "Member" },
        { name: "Mr. K. C. Parulekar", role: "Member" },
        { name: "Mr. M. R. Satghare", role: "Member" },
        { name: "Mr. Ravi Patil", role: "Member" },
        { name: "Mr. Naresh Mhatre", role: "Member" },
        { name: "Mr. Vaibhav Thakur", role: "Member" },
        { name: "Mr. Shailesh Bhoir", role: "Member" }
      ]
    },
    {
      committeeName: "Institution Industry Cell/ Entrepreneurship Development Cell",
      description: "Following Institution Industry Cell/ Entrepreneurship Development Cell has been formulated for Academic Year 2022-23, 2023-24, 2024-25. The committee shall plan and carry out the work.",
      members: [
        { name: "Mr. H. M. Bhosale", role: "Chairman (ME)" },
        { name: "Mr. Anand Aware", role: "Member (CO)" },
        { name: "Mr. N. K. Barwa", role: "Member (CE)" },
        { name: "Mr. S. C. Gidh", role: "Member (CE)" },
        { name: "Mr. A. G. Thakre", role: "Member (ME)" },
        { name: "Mr. R. K. Garud", role: "Member (CO)" },
        { name: "Mrs. Amruta Rathod", role: "Member (CO)" },
        { name: "Mr. Sagar Gawade", role: "Member (ME)" },
        { name: "Mrs. Sheetal Cheke", role: "Member (AN/BD)" }
      ]
    },
    {
      committeeName: "Internal Academic Monitoring Committee",
      description: "As per the guidelines of MSBTE CIAAN document, the following IAMC committee has been constituted for the academic year 2023-24 and 2024-25.",
      members: [
        { name: "Mr. N. B. Kavhale", role: "I/C Principal" },
        { name: "Mrs. R. M. Gangrade", role: "IAMC Co-ordinator" },
        { name: "Mr. V. L. Pereira", role: "I/C HOD CM" },
        { name: "Mr. Parvez Vaghela", role: "I/C HOD CO" },
        { name: "Mr. S. V. Gosavi", role: "I/C HOD CE" },
        { name: "Mrs. Preeti Aware", role: "I/C HOD BD/AN" },
        { name: "Mr. V. K. Sonarkar", role: "Staff Representative" },
        { name: "Mr. Y. A. Mahajan", role: "Academic Co-coordinator" },
        { name: "Mrs. S. S. Kasbe", role: "Staff Representative" }
      ]
    }
  ];

  const reinitializeDatabase = async () => {
    try {
      await Committee.deleteMany({});
      console.log("Existing committees deleted");
  
      await Committee.insertMany(committeeData);
      console.log("New committees added successfully");
    } catch (error) {
      console.error("Error reinitializing database:", error);
    }
  };
  
  reinitializeDatabase();
  