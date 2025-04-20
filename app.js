if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/CapstoneProject";
const Notice = require("./models/notice");
const path = require("path");
const methodOverride = require("method-override");
const Event = require("./models/event");
const Ranker = require("./models/ranker");
const Department = require("./models/department");
const Facility = require("./models/facility");
const Committee = require("./models/committee");
const AdmissionDetail = require("./models/admission");
const Faculty = require("./models/faculty");
const Examination = require("./models/examination");
const multer = require("multer");
const Resource = require("./models/resource");
const { storage, cloudinary } = require("./cloudConfig.js");
const upload = multer({ storage });
const Project = require("./models/project.js");
const stream = require("stream");
const { google } = require("googleapis");
const uploadDrive = multer({ storage: multer.memoryStorage() });
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

const { wrapAsync } = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const {
  validateNotice,
  validateEvent,
  validateRanker,
  validateDepartment,
  validateFacility,
  validateCommittee,
  validateCommitteeEdit,
  validateCommitteeMember,
  validateAdmission,
  validateFaculty,
  validateExamination,
  validateResource,
  validateProject,
  isLoggedIn,
} = require("./middleware.js");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("./models/admin.js");

const sessionOptions = {
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.failure = req.flash("failure");
  res.locals.currUser = req.user || null;
  next();
});

main()
  .then((res) => console.log("Connected to database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "80mb", extended: true })); 

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// TODO: Admin Root 
app.get("/admin", isLoggedIn,(req, res) => {
  res.render("main/index.ejs");
});

// TODO: Notices Routes

// Index route
app.get(
  "/admin/notices",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const allNotices = await Notice.find({});
    res.render("notice/index.ejs", { allNotices });
  })
);

// New Route
app.get("/admin/notices/new", isLoggedIn, (req, res) => {
  res.render("notice/new.ejs");
});

// Create Route
app.post(
  "/admin/notices",
  isLoggedIn,
  validateNotice,
  wrapAsync(async (req, res) => {
    const newNotice = new Notice(req.body.notice);
    await newNotice.save();
    req.flash("success", "Notice created!");
    res.redirect("/admin/notices");
  })
);

// Show Route
app.get(
  "/admin/notices/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let notice = await Notice.findById(id);
    res.render("notice/show.ejs", { notice });
  })
);

// Edit Route
app.get(
  "/admin/notices/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let notice = await Notice.findById(id);
    res.render("notice/edit.ejs", { notice });
  })
);

// Update Route
app.put(
  "/admin/notices/:id",
  isLoggedIn,
  validateNotice,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Notice.findByIdAndUpdate(id, { ...req.body.notice });
    req.flash("success", "Notice updated!");
    res.redirect("/admin/notices");
  })
);

// Delete Route
app.delete(
  "/admin/notices/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Notice.findByIdAndDelete(id);
    req.flash("success", "Notice deleted!");
    res.redirect("/admin/notices");
  })
);
// --------------------------------------------------

// TODO: Events Routes

// Index route
app.get(
  "/admin/events",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const allEvents = await Event.find({});
    res.render("events/index.ejs", { allEvents });
  })
);

// New Route
app.get("/admin/events/new", isLoggedIn, (req, res) => {
  res.render("events/new.ejs");
});

// Create Route
app.post(
  "/admin/events",
  isLoggedIn,
  upload.array("event[imgs]", 10),
  validateEvent,
  wrapAsync(async (req, res) => {
    const { event } = req.body;
    const url = req.files.map((file) => file.path);
    const fileName = req.files.map((file) => file.filename);
    const newEvent = new Event({
      ...event,
      imgs: { url, fileName },
    });
    await newEvent.save();
    req.flash("success", "event added!");
    res.redirect("/admin/events");
  })
);

// Show Route
app.get(
  "/admin/events/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let event = await Event.findById(id);
    res.render("events/show.ejs", { event });
  })
);

// Edit Route
app.get(
  "/admin/events/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let event = await Event.findById(id);
    res.render("events/edit.ejs", { event });
  })
);

// Update Route
app.put(
  "/admin/events/:id",
  isLoggedIn,
  upload.array("event[newImgs]", 10),
  validateEvent,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const event = await Event.findById(id);

    const deleteImgs = req.body.deleteImgs || [];
    const existingImgs = event.imgs || { url: [], fileName: [] };
    const retainedUrls = [];
    const retainedFileNames = [];

    existingImgs.url.forEach((url, i) => {
      if (!deleteImgs.includes(existingImgs.fileName[i])) {
        retainedUrls.push(url);
        retainedFileNames.push(existingImgs.fileName[i]);
      }
    });
    const newImgs = req.files.map((file) => ({
      url: file.path,
      fileName: file.filename,
    }));

    newImgs.forEach((img) => {
      retainedUrls.push(img.url);
      retainedFileNames.push(img.fileName);
    });

    const updatedImgs = {
      url: retainedUrls,
      fileName: retainedFileNames,
    };
    const updatedEvent = {
      ...req.body.event,
      imgs: updatedImgs,
    };
    await Event.findByIdAndUpdate(id, updatedEvent);
    for (const oldImg of deleteImgs) {
      await cloudinary.uploader.destroy(oldImg);
    }
    req.flash("success", "event edited!");
    res.redirect("/admin/events");
  })
);

// Delete Route
app.delete(
  "/admin/events/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const event = await Event.findById(id);
    if (event && event.imgs && event.imgs.url.length > 0) {
      for (const imgFileName of event.imgs.fileName) {
        await cloudinary.uploader.destroy(imgFileName);
      }
    }
    await Event.findByIdAndDelete(id);
    req.flash("success", "event deleted!");
    res.redirect("/admin/events");
  })
);

//TODO: Rankers Route

// Index Route
app.get(
  "/admin/rankers",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const coRankers = await Ranker.find({
      department: "Computer Engineering",
    })
      .sort({ percentage: -1 })
      .limit(10);

    const ciRankers = await Ranker.find({ department: "Civil Engineering" })
      .sort({ percentage: -1 })
      .limit(10);

    const meRankers = await Ranker.find({
      department: "Mechanical Engineering",
    })
      .sort({ percentage: -1 })
      .limit(10);

    const bdRankers = await Ranker.find({ department: "Big Data" })
      .sort({ percentage: -1 })
      .limit(10);

    const aiRankers = await Ranker.find({
      department: "Artificial Intelligence",
    })
      .sort({ percentage: -1 })
      .limit(10);

    res.render("rankers/index.ejs", {
      coRankers,
      ciRankers,
      meRankers,
      bdRankers,
      aiRankers,
    });
  })
);

//New Route
app.get("/admin/rankers/new", isLoggedIn, (req, res) => {
  res.render("rankers/new.ejs");
});

// Create Route
app.post(
  "/admin/rankers",
  isLoggedIn,
  upload.single("ranker[photo]"),
  validateRanker,
  wrapAsync(async (req, res) => {
    const newRanker = new Ranker(req.body.ranker);
    let url = req.file.path;
    let fileName = req.file.filename;
    newRanker.photo = { url, fileName };
    await newRanker.save();
    req.flash("success", "rankers added successfully!");
    res.redirect("/admin/rankers");
  })
);

// Edit Route
app.get(
  "/admin/rankers/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let ranker = await Ranker.findById(id);
    res.render("rankers/edit", { ranker });
  })
);

app.put(
  "/admin/rankers/:id",
  isLoggedIn,
  upload.single("ranker[newPhoto]"), // Change to match form field
  validateRanker,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let ranker = await Ranker.findById(id);

    if (req.file) {
      // Delete old image from Cloudinary before replacing
      if (ranker && ranker.photo && ranker.photo.fileName) {
        await cloudinary.uploader.destroy(ranker.photo.fileName);
      }
      // Assign new image
      ranker.photo = {
        url: req.file.path,
        fileName: req.file.filename,
      };
    } else if (req.body.ranker.existingPhoto) {
      // Retain old image if no new file is uploaded
      ranker.photo = {
        url: req.body.ranker.existingPhoto,
        fileName: ranker.photo.fileName,
      };
    }

    // Update other ranker details
    ranker.set(req.body.ranker);
    await ranker.save();

    req.flash("success", "Ranker edited successfully!");
    res.redirect("/admin/rankers");
  })
);



// Delete Route
app.delete(
  "/admin/rankers/delete",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { department } = req.query;
    const rankers = await Ranker.find({ department: department });

    for (const ranker of rankers) {
      if (ranker.photo.fileName) {
        await cloudinary.uploader.destroy(ranker.photo.fileName);
      }
    }
    await Ranker.deleteMany({ department: department });
    req.flash("success", "rankers deleted!");
    res.redirect("/admin/rankers");
  })
);

// --------------------------------------------------
// TODO: Department Routes

// Index route
app.get(
  "/admin/departments",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const allDepartments = await Department.find({});
    res.render("departments/index.ejs", { allDepartments });
  })
);

// New Route
app.get("/admin/departments/new", isLoggedIn, (req, res) => {
  res.render("departments/new.ejs");
});

// Create Route
const preprocessDepartmentData = (req, res, next) => {
  if (req.body.department) {
    req.body.department.courses = req.body.department.courses
      ? req.body.department.courses.split(",").map((item) => item.trim())
      : [];

    req.body.department.mission = req.body.department.mission
      ? req.body.department.mission.split(",").map((item) => item.trim())
      : [];

    req.body.department.careerOpportunities = req.body.department.careerOpportunities
      ? req.body.department.careerOpportunities.split(",").map((item) => item.trim())
      : [];

    req.body.department.departmentFeatures = req.body.department.departmentFeatures
      ? req.body.department.departmentFeatures.split(",").map((item) => item.trim())
      : [];
    
    req.body.department.programEducationalObjectives = req.body.department.programEducationalObjectives
      ? req.body.department.programEducationalObjectives.split(",").map((item) => item.trim())
      : [];
  }
  next();
};

app.post(
  "/admin/departments",
  isLoggedIn,
  uploadDrive.array("syllabusFiles"), // Handle multiple file uploads
  preprocessDepartmentData,
  validateDepartment,
  wrapAsync(async (req, res) => {
    const newDepartment = new Department(req.body.department);

    if (req.files && req.files.length > 0) {
      newDepartment.syllabus = [];

      // Ensure syllabus details are an array
      let syllabusData = req.body.department.syllabus;
      if (!Array.isArray(syllabusData)) {
        syllabusData = [syllabusData]; // Convert single entry to array
      }

      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const { fileUrl, fileName } = await uploadFile(file);

        newDepartment.syllabus.push({
          semester: parseInt(syllabusData[i]?.semester) || i + 1, // Default to index +1 if missing
          fileName,
          fileUrl,
        });
      }
    }

    await newDepartment.save();
    req.flash("success", "Department added with syllabus files uploaded!");
    res.redirect("/admin/departments");
  })
);



// Show Route
app.get(
  "/admin/departments/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let department = await Department.findById(id)
      .populate("faculty")
      .populate("examination");
    res.render("departments/show.ejs", { department });
  })
);

// Edit Route
app.get(
  "/admin/departments/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let department = await Department.findById(id);
    res.render("departments/edit.ejs", { department });
  })
);

// // Update Route
app.put(
  "/admin/departments/:id",
  isLoggedIn,
  preprocessDepartmentData, // Convert data before validation
  validateDepartment,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Department.findByIdAndUpdate(id, { ...req.body.department });
    req.flash("success", "Department updated!");
    res.redirect("/admin/departments");
  })
);

// Delete Route
app.delete(
  "/admin/departments/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Department.findByIdAndDelete(id);
    req.flash("success", "Department deleted!");
    res.redirect("/admin/departments");
  })
);

// ----------------------------------------------------------------

// TODO: Facility Routes

// Index route
app.get(
  "/admin/facilities",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const allFacilities = await Facility.find({});
    res.render("facilities/index.ejs", { allFacilities });
  })
);

// New Route
app.get("/admin/facilities/new", isLoggedIn, (req, res) => {
  res.render("facilities/new.ejs");
});

// Create Route
app.post(
  "/admin/facilities",
  isLoggedIn,
  upload.single("facility[img]"),
  validateFacility,
  wrapAsync(async (req, res) => {
    const newFacility = new Facility(req.body.facility);
    let url = req.file.path;
    let fileName = req.file.filename;
    newFacility.img = { url, fileName };
    await newFacility.save();
    req.flash("success", "Facility added!");
    res.redirect("/admin/facilities");
  })
);

// Show Route
app.get(
  "/admin/facilities/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let facility = await Facility.findById(id);
    res.render("facilities/show.ejs", { facility });
  })
);

// Edit Route
app.get(
  "/admin/facilities/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let facility = await Facility.findById(id);
    res.render("facilities/edit.ejs", { facility });
  })
);

// Update Route
app.put(
  "/admin/facilities/:id",
  isLoggedIn,
  upload.single("facility[img]"),
  validateFacility,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let facility = await Facility.findById(id);
    if (facility && facility.img.fileName) {
      await cloudinary.uploader.destroy(facility.img.fileName);
    }
    facility.set(req.body.facility);
    if (req.file) {
      facility.img = {
        url: req.file.path,
        fileName: req.file.filename,
      };
    }
    await facility.save();
    req.flash("success", "Facility updated!");
    res.redirect("/admin/facilities");
  })
);

// Delete Route
app.delete(
  "/admin/facilities/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let facility = await Facility.findById(id);
    if (facility && facility.img.fileName) {
      await cloudinary.uploader.destroy(facility.img.fileName);
    }
    await Facility.findByIdAndDelete(id);
    req.flash("success", "Facility deleted!");
    res.redirect("/admin/facilities");
  })
);

// ----------------------------------------------------------------

// TODO: Committee Routes

// Index route
app.get(
  "/admin/committees",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const allCommittees = await Committee.find({});
    res.render("committees/index.ejs", { allCommittees });
  })
);

// New Route
app.get("/admin/committees/new", isLoggedIn, (req, res) => {
  res.render("committees/newCommittee.ejs");
});

// Create Route
app.post(
  "/admin/committees",
  isLoggedIn,
  validateCommittee,
  wrapAsync(async (req, res) => {
    const newCommittee = new Committee(req.body.committee);
    await newCommittee.save();
    req.flash("success", "Committee added!");
    res.redirect("/admin/committees");
  })
);

// Show Route
app.get(
  "/admin/committees/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let committee = await Committee.findById(id);
    res.render("committees/show.ejs", { committee });
  })
);

// new member route
app.get(
  "/admin/committees/:id/members",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let committee = await Committee.findById(id);
    res.render("committees/newMember.ejs", { committee });
  })
);

// Add new member
app.put(
  "/admin/committees/:id/members",
  isLoggedIn,
  validateCommitteeMember,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newMember = req.body.member;
    await Committee.findByIdAndUpdate(
      id,
      { $push: { members: newMember } },
      { new: true }
    );
    req.flash("success", "New member added!");
    res.redirect("/admin/committees");
  })
);

// Edit Route
app.get(
  "/admin/committees/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let committee = await Committee.findById(id);
    res.render("committees/edit.ejs", { committee });
  })
);

// Update Route
app.put(
  "/admin/committees/:id",
  isLoggedIn,
  validateCommitteeEdit,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { committeeName, description, members } = req.body.committeeEdit; // ✅ Get data properly

    await Committee.findByIdAndUpdate(id, {
      committeeName,
      description,
      members,
    });

    req.flash("success", "Committee updated!");
    res.redirect("/admin/committees");
  })
);


// Delete Route
app.delete(
  "/admin/committees/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Committee.findByIdAndDelete(id);
    req.flash("success", "Committee deleted!");
    res.redirect("/admin/committees");
  })
);

// delete member
app.delete(
  "/admin/committees/:id/members",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { memberName } = req.body;
    await Committee.findByIdAndUpdate(
      id,
      { $pull: { members: { name: memberName } } }, // Use $pull to remove the member with the specified name
      { new: true }
    );
    req.flash("success", "Member deleted!");
    res.redirect(`/admin/committees/${id}`);
  })
);
//----------------------------------------------------------------------------------

//TODO: Admission Details Route

// Index Route
app.get(
  "/admin/admissions",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let admissionDetails = await AdmissionDetail.find({});
    res.render("admissions/index.ejs", { admissionDetails });
  })
);

// Edit Route
app.get(
  "/admin/admissions/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let admissionDetails = await AdmissionDetail.findById(id);
    res.render("admissions/edit.ejs", { admissionDetails });
  })
);

//update Route
app.put(
  "/admin/admissions/:id",
  isLoggedIn,
  validateAdmission,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await AdmissionDetail.findByIdAndUpdate(id, {
      ...req.body.admissionDetails,
    });
    req.flash("success", "Data updated!");
    res.redirect("/admin/admissions");
  })
);
//---------------------------------------------------------------------------------------

//TODO: Faculty Route

// to add new faculty
app.get("/admin/faculties/:id/new", isLoggedIn, (req, res) => {
  let { id } = req.params;
  res.render("faculties/new.ejs", { id });
});

// Create Route
app.post(
  "/admin/faculties/:id",
  isLoggedIn,
  upload.single("faculty[photo]"),
  validateFaculty,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let url = req.file.path;
    let fileName = req.file.filename;
    let department = await Department.findById(id);
    let newFaculty = await Faculty(req.body.faculty);
    newFaculty.photo = { url, fileName };
    newFaculty.department = department.departmentName;
    department.faculty.push(newFaculty);
    newFaculty.save();
    department.save();
    req.flash("success", "Faculty added!");
    res.redirect("/admin/departments");
  })
);

// Show Route
app.get(
  "/admin/department/:depId/faculties/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { depId, id } = req.params;
    let faculty = await Faculty.findById(id);
    res.render("faculties/show.ejs", { faculty, depId });
  })
);

// Edit Route
app.get(
  "/admin/faculties/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let faculty = await Faculty.findById(id);
    res.render("faculties/edit.ejs", { faculty });
  })
);

// Update Route
app.put(
  "/admin/faculties/:id",
  isLoggedIn,
  upload.single("faculty[photo]"),
  validateFaculty,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let faculty = await Faculty.findById(id);
    let department = await Department.findOne({ departmentName: req.body.faculty.department });

    // Keep old photo if no new file is uploaded
    if (req.file) {
      if (faculty.photo.fileName) {
        await cloudinary.uploader.destroy(faculty.photo.fileName);
      }
      faculty.photo = {
        url: req.file.path,
        fileName: req.file.filename,
      };
    }

    // Update other fields
    faculty.set(req.body.faculty);
    await faculty.save();

    req.flash("success", "Faculty updated!");
    res.redirect(`/admin/department/${department._id}/faculties/${id}`);
  })
);

// Delete Route
app.delete(
  "/admin/department/:depId/faculties/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { depId, id } = req.params;
    await Department.findByIdAndUpdate(depId, { $pull: { faculty: id } });
    const faculty = await Faculty.findById(id);
    if (faculty && faculty.photo.fileName) {
      await cloudinary.uploader.destroy(faculty.photo.fileName);
    }
    await Faculty.findByIdAndDelete(id);
    req.flash("success", "Faculty deleted!");
    res.redirect("/admin/departments");
  })
);

//--------------------------------------------------------------------------

//TODO: Examination Route

// to add new faculty
app.get("/admin/examinations/:id/new", isLoggedIn, (req, res) => {
  let { id } = req.params;
  res.render("examinations/new.ejs", { id });
});

// Create Route
app.post(
  "/admin/examinations/:id",
  isLoggedIn,
  uploadDrive.single("exam[timetable]"),
  validateExamination,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const examData = req.body.exam;
    const timetableFile = req.file;


    if (timetableFile) {
      try {
        const { fileUrl, fileName } = await uploadFile(timetableFile); // Ensure await is used properly
       
        examData.timetable = {
          url: fileUrl,
          fileName: timetableFile.originalname,
        };
      } catch (error) {
        console.error("Error uploading file to Google Drive:", error);
        req.flash("error", "File upload failed!");
        return res.redirect(`/admin/departments/${id}`);
      }
    }

    // Ensure department is found before proceeding
    const department = await Department.findById(id);
    if (!department) {
      req.flash("error", "Department not found!");
      return res.redirect("/admin/departments");
    }

    const newExam = new Examination(examData);
    newExam.department = department.departmentName;
    department.examination.push(newExam);

    await newExam.save();
    await department.save();

    req.flash("success", "Examination created!");
    res.redirect(`/admin/departments/${id}`);
  })
);



// Edit Route
app.get(
  "/admin/examinations/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let exam = await Examination.findById(id);
    res.render("examinations/edit.ejs", { exam });
  })
);

// Update Route
// Examination Update Route
app.put(
  "/admin/examinations/:id",
  isLoggedIn,
  uploadDrive.single("exam[timetable]"), // Use multer to handle timetable file upload
  validateExamination,
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    // Retrieve the new examination data from the form
    const examData = req.body.exam;
    const newTimetableFile = req.file; // Access the uploaded new timetable file

    // Find the existing examination to get the current file data
    const examination = await Examination.findById(id);

    // If a new file was uploaded, update it on Google Drive
    if (newTimetableFile) {
      // Delete the old file from Google Drive (if there is an existing one)
      if (examination.timetable && examination.timetable.url) {
        const fileId = examination.timetable.url.split("/d/")[1].split("/")[0];
        await drive.files.delete({ fileId });
      }

      // Upload the new timetable file to Google Drive and get the link
      const newTimetableURL = await uploadFile(newTimetableFile);
      examData.timetable = {
        url: newTimetableURL,
        fileName: newTimetableFile.originalname,
      };
    } else {
      // If no new file is uploaded, retain the existing timetable data
      examData.timetable = examination.timetable;
    }

    // Update the examination document in MongoDB
    await Examination.findByIdAndUpdate(id, examData, { new: true });

    req.flash("success", "Examination updated!");
    // Redirect to the department page after successful update
    res.redirect(`/admin/departments`);
  })
);

// Delete Route
app.delete(
  "/admin/department/:depId/examinations/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { depId, id } = req.params;
    await Department.findByIdAndUpdate(depId, { $pull: { examination: id } });
    const examination = await Examination.findById(id);
    if (examination && examination.timetable && examination.timetable.url) {
      const fileId = examination.timetable.url.split("/d/")[1].split("/")[0];
      await drive.files.delete({ fileId });
    }

    await Examination.findByIdAndDelete(id);
    req.flash("success", "Examination deleted!");
    res.redirect(`/admin/departments`);
  })
);

//-------------------------------------------------------------------------

//TODO: Resources Route

// Google Drive setup
const KEYFILEPATH = path.join(__dirname, "apikey.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});
const drive = google.drive({ version: "v3", auth });

const uploadFile = async (file) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);


  const response = await drive.files.create({
    media: {
      mimeType: file.mimetype,
      body: bufferStream,
    },
    requestBody: {
      name: file.originalname,
      parents: ["1FnnuBR0aFQfSMMdsvVFMueUULcGMq1Zs"], // Google Drive folder ID
    },
    fields: "id, name", // Request file ID and name
  });


  if (!response.data || !response.data.id) {
    throw new Error("Failed to upload file to Google Drive - No file ID returned");
  }

  const fileUrl = `https://drive.google.com/file/d/${response.data.id}/view`;
  const fileName = response.data.name; // Extract the file name properly


  return { fileUrl, fileName }; // ✅ Return both fileUrl and fileName
};




// Index Route
app.get(
  "/admin/resources",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const resources = await Resource.find({});
    const groupedResources = resources.reduce((acc, resource) => {
      const { semester } = resource;
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push(resource);
      return acc;
    }, {});
    res.render("resources/index.ejs", { groupedResources });
  })
);

// New Route
app.get("/admin/resources/:id/new", isLoggedIn, (req, res) => {
  let { id } = req.params;
  res.render("resources/new.ejs", { id });
});

// Create Route
app.post(
  "/admin/resources/:id",
  isLoggedIn,
  uploadDrive.fields([
    { name: "resource[materials][0][textbookURL]" },
    { name: "resource[materials][0][paperLinks][]" },
  ]),
  validateResource,
  wrapAsync(async (req, res) => {
    // Parse form data
    const resourceData = req.body.resource;
    const files = req.files;
    const material = {
      textbookTitle: resourceData.materials[0].textbookTitle,
      textbookURL: {},
      paperLinks: [],
    };

    // Upload the textbook file to Google Drive and get the link
    if (files["resource[materials][0][textbookURL]"]) {
      const textbookFile = files["resource[materials][0][textbookURL]"][0];
      const {fileUrl} = await uploadFile(textbookFile);
      material.textbookURL = {
        url: fileUrl,
        fileName: textbookFile.originalname,
      };
    }

    // Upload each paper link file to Google Drive and add it to paperLinks array
    if (files["resource[materials][0][paperLinks][]"]) {
      for (let file of files["resource[materials][0][paperLinks][]"]) {
        const {fileUrl} = await uploadFile(file);
        console.log("File URL:", fileUrl); // Log the file URL for debugging
        material.paperLinks.push({
          url: fileUrl,
          fileName: file.originalname,
        });
      }
    }

    const department = await Department.findById(req.params.id);

    const newResource = new Resource(resourceData);
    newResource.department = department.departmentName;
    newResource.materials = material;
    department.resource.push(newResource);

    await newResource.save();
    await department.save();

    req.flash("success", "Resources uploaded successfully!");

    res.status(200).redirect("/admin/resources");
  })
);

// Show Route
app.get(
  "/admin/resources/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const resource = await Resource.findById(req.params.id);
    res.render("resources/show.ejs", { resource });
  })
);

// Delete Route
app.delete(
  "/admin/resources/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const resource = await Resource.findById(id);
    let { department } = resource;
    const dept = await Department.findOne({ departmentName: department });
    await dept.updateOne({ $pull: { resource: id } });

    // Loop through materials and delete files from Google Drive
    for (let material of resource.materials) {
      if (material.textbookURL && material.textbookURL.url) {
        const fileId = material.textbookURL.url.split("/d/")[1].split("/")[0]; // Extracting file ID correctly
        await drive.files.delete({ fileId });
      }

      for (let paper of material.paperLinks) {
        if (paper.url) {
          const fileId = paper.url.split("/d/")[1].split("/")[0]; // Extracting file ID correctly
          await drive.files.delete({ fileId });
        }
      }
    }

    // Delete the resource from the MongoDB database
    await Resource.findByIdAndDelete(id);
    req.flash("success", "Resources deleted!");
    res.redirect("/admin/resources");
  })
);

// TODO:Project Repository Route

// Index route
app.get(
  "/admin/projects",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const projects = await Project.find({});

    // Group projects by department
    const allProjects = {};
    projects.forEach((project) => {
      const department = project.department;
      if (!allProjects[department]) {
        allProjects[department] = [];
      }
      allProjects[department].push(project);
    });

    res.render("projects/index.ejs", { allProjects });
  })
);

// New Route
app.get("/admin/projects/new", isLoggedIn, (req, res) => {
  res.render("projects/new.ejs");
});

// Create Route
// Middleware to convert studentName string to an array
const parseStudentNames = (req, res, next) => {
  if (req.body.project && typeof req.body.project.studentName === "string") {
    req.body.project.studentName = req.body.project.studentName
      .split(",")
      .map(name => name.trim());
  }
  next();
};

app.post(
  "/admin/projects",
  isLoggedIn,
  parseStudentNames, // ✅ Convert studentName to an array before validation
  validateProject,   // ✅ Now Joi validation will work correctly
  wrapAsync(async (req, res) => {
    const newProject = new Project(req.body.project);
    await newProject.save();
    res.redirect("/admin/projects");
  })
);

// Show Route
app.get(
  "/admin/projects/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let project = await Project.findById(id);
    res.render("projects/show.ejs", { project });
  })
);

// Edit Route
app.get(
  "/admin/projects/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let project = await Project.findById(id);
    res.render("projects/edit.ejs", { project });
  })
);

// Update Route
app.put(
  "/admin/projects/:id",
  isLoggedIn,
  parseStudentNames,
  validateProject,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Project.findByIdAndUpdate(id, { ...req.body.project });
    res.redirect("/admin/projects");
  })
);

// Delete Route
app.delete(
  "/admin/projects/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.redirect("/admin/projects");
  })
);

// TODO: Authentication routes

app.get("/admin/login", (req, res) => {
  res.render("authentication/login.ejs");
});

app.post(
  "/admin/login",
  passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Logged in successfully!");
    res.redirect("/admin");
  }
);


app.get("/admin/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("failure", "Error occurred in logging out!");
      return res.redirect("/admin");
    }
  });
  req.flash("success", "Logged out successfully!");
  res.redirect("/admin");
});

// -----------------------------------------------------------------------
// TODO: User Routes

// Root User
app.get("/user",async (req, res) => {
  const allNotices = await Notice.find({});
  const formattedNotices = allNotices.map(notice => ({
    ...notice._doc, // Spread existing document fields
    datePosted: notice.datePosted ? new Date(notice.datePosted) : null
  }));
  res.render("main/userIndex.ejs",{formattedNotices});
});

// Notice Route
app.get(
  "/user/notices",
  wrapAsync(async (req, res) => {
    const allNotices = await Notice.find({});
    const formattedNotices = allNotices.map(notice => ({
      ...notice._doc, // Spread existing document fields
      datePosted: notice.datePosted ? new Date(notice.datePosted) : null
    }));
    res.render('notice/userShow', { allNotices: formattedNotices });
  })
);

// Event Route
app.get(
  "/user/events",
  wrapAsync(async (req, res) => {
    const allEvents = await Event.find({});
    res.render("events/userShow.ejs", { allEvents });
  })
);

// facilities Route
app.get(
  "/user/facilities",
  wrapAsync(async (req, res) => {
    const allFacilities = await Facility.find({});
    res.render("facilities/userShow.ejs", { allFacilities });
  })
);

// Department Route
app.get(
  "/user/departments",
  wrapAsync(async (req, res) => {
    let { departmentName } = req.query;
    const allDepartments = await Department.find({
      departmentName: departmentName,
    });
    res.render("departments/userShow.ejs", { allDepartments });
  })
);

// Admission Route
app.get(
  "/user/admissions",
  wrapAsync(async (req, res) => {
    const admissionDetails = await AdmissionDetail.find({});
    res.render("admissions/userShow.ejs", { admissionDetails });
  })
);

// Committee Route
app.get(
  "/user/committees",
  wrapAsync(async (req, res) => {
    const committees = await Committee.find({});
    res.render("committees/userShow.ejs", { committees });
  })
);

// Faculty Route
app.get(
  "/user/faculties",
  wrapAsync(async (req, res) => {
    const { department } = req.query; // Get department from query params
    let filter = {};

    if (department) {
      filter.department = department; // Apply filter if department is specified
    }

    const faculties = await Faculty.find(filter);
    res.render("faculties/userShow.ejs", { faculties,selectedDepartment: department || ""  });
  })
);

app.get(
  "/user/resources",
  wrapAsync(async (req, res) => {
    const { department } = req.query; // Get the department filter from query params

    let filter = {}; // Default: Show all resources
    if (department && department !== "") {
      filter.department = department; // Apply department filter if selected
    }

    const allResources = await Resource.find(filter);

    // Group resources by department
    const resourcesByDepartment = allResources.reduce((acc, resource) => {
      if (!acc[resource.department]) {
        acc[resource.department] = [];
      }
      acc[resource.department].push(resource);
      return acc;
    }, {});

    res.render("resources/userShow.ejs", { resourcesByDepartment, selectedDepartment: department || "" });
  })
);



// Projects Route
app.get(
  "/user/projects",
  wrapAsync(async (req, res) => {
    const { department } = req.query;

    let filter = {};
    if (department) filter.department = department;

    const projects = await Project.find(filter);
    const allProjects = {};

    projects.forEach((project) => {
      const dept = project.department;
      if (!allProjects[dept]) {
        allProjects[dept] = [];
      }
      allProjects[dept].push(project);
    });

    res.render("projects/userShow.ejs", { allProjects, selectedDepartment: department });
  })
);

// Ranker Route
app.get(
  "/user/rankers",
  wrapAsync(async (req, res) => {
    const allRankers = await Ranker.find({});

    const rankersByDepartmentAndYear = {};
    allRankers.forEach((ranker) => {
      const { department, year } = ranker;
      if (!rankersByDepartmentAndYear[department]) {
        rankersByDepartmentAndYear[department] = {};
      }
      if (!rankersByDepartmentAndYear[department][year]) {
        rankersByDepartmentAndYear[department][year] = [];
      }
      rankersByDepartmentAndYear[department][year].push(ranker);
    });

    for (const department in rankersByDepartmentAndYear) {
      for (const year in rankersByDepartmentAndYear[department]) {
        rankersByDepartmentAndYear[department][year].sort(
          (a, b) => b.percentage - a.percentage
        );
      }
    }
    res.render("rankers/userShow.ejs", { rankersByDepartmentAndYear });
  })
);

// Examination Route
app.get(
  "/user/examinations",
  wrapAsync(async (req, res) => {
    let { departmentName } = req.query;
    const allExams = await Examination.find({
      department: departmentName,
    });
    res.render("examinations/userShow.ejs", { allExams });
  })
);

// 404 Page Not Found Middleware
app.all("*", (req, res, next) => {
  next({ status: 404, message: "Page Not Found!" });
});

// error handling method
app.use((err, req, res, next) => {
  let { status = 500, message = "Some error occurred!" } = err;
  res.status(status).render("error.ejs", { message });
});

async function deleteExpiredExams() {
  try {
    const today = new Date(); // Get the current date
    const result = await Examination.deleteMany({ endDate: { $lt: today } });

    console.log(`${result.deletedCount} expired exams deleted.`);
  } catch (error) {
    console.error("Error deleting expired exams:", error);
  }
}

// Function to check if today is July 1st and update experience
async function updateFacultyExperience() {
  const today = new Date();
  if (today.getDate() === 1 && today.getMonth() === 6) { // July is month index 6
    console.log("Updating faculty experience for the new academic year...");

    try {
      await Faculty.updateMany({}, { $inc: { experience: 1 } });
      console.log("Faculty experience updated successfully!");
    } catch (error) {
      console.error("Error updating faculty experience:", error);
    }
  }
}

app.listen(3000, () => {
  deleteExpiredExams();
  updateFacultyExperience();
  console.log("server running on port 3000");
});
