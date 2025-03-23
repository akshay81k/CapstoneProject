const Joi = require("joi");

//notice schema
module.exports.noticeSchema = Joi.object({
  notice: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    datePosted: Joi.date(),
    postedBy: Joi.string().required(),
    category: Joi.string().required(),
  }).required(),
});

// event schema
module.exports.eventSchema = Joi.object({
  event: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().iso().required(),
    organizer: Joi.string(),
    category: Joi.string().required(),
    venue: Joi.string().required(),
    imgs: Joi.object({
      url: Joi.array().items(Joi.string()).allow(null, ""),
      fileName: Joi.array().items(Joi.string()).allow(null, ""),
    }).allow(null, ""),
    existingImgs: Joi.array().items(Joi.string()).optional(),
    existingFileNames: Joi.array().items(Joi.string()).optional(),
  }).required(),
});

module.exports.rankerSchema = Joi.object({
  ranker: Joi.object({
    name: Joi.string().required(),
    year: Joi.string().required(),
    department: Joi.string().required(),
    percentage: Joi.number().required().min(1).max(100),
    photo: Joi.string().allow("", null),
    existingPhoto: Joi.string().allow("", null), // ✅ Allow existing photo field
  }).required(),
});

//department schema
module.exports.departmentSchema = Joi.object({
  department: Joi.object({
    departmentName: Joi.string().required(),
    hod: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
    courses: Joi.array().items(Joi.string()).required(),
    vision: Joi.string().required(),
    mission: Joi.array().items(Joi.string()).required(),
    programDetails: Joi.object({
      intake: Joi.number().integer().min(1).required(),
      duration: Joi.string().required(),
    }).required(),
    scope: Joi.string().required(),
    careerOpportunities: Joi.array().items(Joi.string()).required(),
    departmentFeatures: Joi.array().items(Joi.string()).required(),
    departmentalAdvisoryBoard: Joi.array().items(
      Joi.object({
        name: Joi.string().required(), // Name of the member
        designation: Joi.string().required(), // Designation of the member
        role: Joi.string().required(), // Role in DAB (e.g., Chairman, Member, Parent, Alumni)
      })
    ).required(),
     // Validation for Program Educational Objectives (PEO)
     programEducationalObjectives: Joi.array().items(Joi.string()).required(),

     // Validation for Program Outcomes (PO)
     programOutcomes: Joi.array().items(
       Joi.object({
         title: Joi.string().required(),
         description: Joi.string().required(),
       })
     ).required(),
 
     // Validation for Program Specific Outcomes (PSO)
     programSpecificOutcomes: Joi.array().items(
       Joi.object({
         title: Joi.string().required(),
         description: Joi.string().required(),
       })
     ).required(),
     syllabus: Joi.array().items(
      Joi.object({
        semester: Joi.number().integer().min(1).max(8), // Semester (1-8)
        fileName: Joi.string().optional(), // Syllabus file name (optional)
        fileUrl: Joi.string().uri().optional(), // Syllabus file URL (optional)
      })
    ).optional(),
  }).required(),
});

// facility schema
module.exports.facilitySchema = Joi.object({
  facility: Joi.object({
    facilityName: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    timing: Joi.string().required(),
    contact: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    }),
    img: Joi.string().allow("", null),
  }).required(),
});

// committee schema - edit route
module.exports.committeeSchemaEdit = Joi.object({
  committeeEdit: Joi.object({
    committeeName: Joi.string().required(),
    description: Joi.string().required(),
    members: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          role: Joi.string().required(),
        })
      )
      .min(1),
  }).required(),
});

// committee schema - create route
module.exports.committeeSchema = Joi.object({
  committee: Joi.object({
    committeeName: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

// committee schema - add member route
module.exports.memberSchema = Joi.object({
  member: Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
  }).required(),
});

// admission schema
module.exports.admissionSchema = Joi.object({
  admissionDetails: Joi.object({
    eligibilityCriteria: Joi.string().required().trim(),
    eligibilityCriteria: Joi.string().required().trim(),
    applicationDeadline: Joi.date().required(),
    admissionProcedure: Joi.string().required().trim(),
    feeStructure: Joi.array()
      .items(
        Joi.object({
          year: Joi.string().required().trim(),
          category: Joi.string().required().trim(),
          applicability: Joi.string().required().trim(),
          tuitionFee: Joi.number().min(0).required(),
          developmentFee: Joi.number().min(0).default(0),
          labFee: Joi.number().min(0).default(0),
          examFee: Joi.number().min(0).default(0),
          enrollmentFee: Joi.number().min(0).default(0),
          actualFee: Joi.number().min(0).required(),
        })
      )
      .required(),
    admissionProcedure: Joi.string().required().trim(),
    feeStructure: Joi.array()
      .items(
        Joi.object({
          year: Joi.string().required().trim(),
          category: Joi.string().required().trim(),
          applicability: Joi.string().required().trim(),
          tuitionFee: Joi.number().min(0).required(),
          developmentFee: Joi.number().min(0).default(0),
          labFee: Joi.number().min(0).default(0),
          examFee: Joi.number().min(0).default(0),
          enrollmentFee: Joi.number().min(0).default(0),
          actualFee: Joi.number().min(0).required(),
        })
      )
      .required(),
    contact: Joi.object({
      name: Joi.string().required().trim(),
      email: Joi.string().email().required().trim(),
      phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(), // Updated regex
    }).required(),
  }).required(),
}).unknown(true); // Allows extra fields

// faculty schema
module.exports.facultySchema = Joi.object({
  faculty: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    adharNo: Joi.string().length(12).pattern(/^\d+$/).required(),
    date_of_birth: Joi.date().iso().required(),
    qualification: Joi.string().required(),
    department: Joi.string().optional(),
    designation: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    specialization: Joi.string().required(),
    experience: Joi.string().required(),
    date_of_joining: Joi.date().iso().required(),
    photo: Joi.object({
      url: Joi.string().allow("", null),
      fileName: Joi.string().allow("", null),
    }).allow(null),
  }).required(),
});


// examination route
module.exports.examinationSchema = Joi.object({
  exam: Joi.object({
    examName: Joi.string().required(),
    examType: Joi.string().required(),
    semester: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().required(),
    timetable: Joi.string().allow("", null),
  }).required(),
});

// resource schema
module.exports.resourceSchema = Joi.object({
  resource: Joi.object({
    subjectName: Joi.string().required(),
    semester: Joi.number().required().min(1).max(6),
    subjectCode: Joi.string().required(),
    materials: Joi.array()
      .items(
        Joi.object({
          textbookTitle: Joi.string().allow("", null),
          textbookURL: Joi.string().allow("", null),
          paperLinks: Joi.array()
            .items(
              Joi.object({
                url: Joi.string().uri().allow("", null),
                fileName: Joi.string().allow("", null),
              })
            )
            .optional(),
          uploadDate: Joi.date().default(Date.now),
        })
      )
      .optional(),
  }).required(),
});

// project schema
module.exports.projectSchema = Joi.object({
  project: Joi.object({
    studentName: Joi.array().items(Joi.string()),
    graduationYear: Joi.string().required(),
    department: Joi.string().required(),
    projectDetails: Joi.object({
      projectName: Joi.string().required(),
      description: Joi.string().required(),
      githubLink: Joi.string().uri().required(),
      submissionDate: Joi.date().default(Date.now),
      status: Joi.string().valid("in progress", "completed", "archived"),
    }).required(),
  }).required(),
});

module.exports.adminSchema = Joi.object({
  email: Joi.string().required(),
});
