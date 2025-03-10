const {
  noticeSchema,
  eventSchema,
  rankerSchema,
  departmentSchema,
  facilitySchema,
  committeeSchemaEdit,
  committeeSchema,
  memberSchema,
  admissionSchema,
  facultySchema,
  examinationSchema,
  resourceSchema,
  projectSchema,
} = require("./schema.js");

const ExpressError = require("./utils/ExpressError.js");

// MIDDLEWARE: to validate noticeSchema
module.exports.validateNotice = (req, res, next) => {
  let { error } = noticeSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate eventSchema
module.exports.validateEvent = (req, res, next) => {
  let { error } = eventSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate rankerSchema
module.exports.validateRanker = (req, res, next) => {
  let { error } = rankerSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate departmentSchema
module.exports.validateDepartment = (req, res, next) => {
  let { error } = departmentSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate facilitySchema
module.exports.validateFacility = (req, res, next) => {
  let { error } = facilitySchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate committeeSchema
module.exports.validateCommittee = (req, res, next) => {
  let { error } = committeeSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate committeeSchemaEdit
module.exports.validateCommitteeEdit = (req, res, next) => {
  let { error } = committeeSchemaEdit.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate memberSchema
module.exports.validateCommitteeMember = (req, res, next) => {
  let { error } = memberSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate admissionSchema
module.exports.validateAdmission = (req, res, next) => {
  let { error } = admissionSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate facultySchema
module.exports.validateFaculty = (req, res, next) => {
  let { error } = facultySchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate examinationSchema
module.exports.validateExamination = (req, res, next) => {
  let { error } = examinationSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate resourceSchema
module.exports.validateResource = (req, res, next) => {
  let { error } = resourceSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate projectSchema
module.exports.validateProject = (req, res, next) => {
  let { error } = projectSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

// MIDDLEWARE: to validate admin login
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //flash
    return res.redirect("/admin/login");
  }
  next();
};
