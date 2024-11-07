const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// define path where to upload files in cloud
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "bvp_storage",
//     allowedFormats: ["png", "jpg", "jpeg","pdf","mp4"], // supports promises as well
//   },
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     let resourceType = "image";

//     // Set resource type to 'raw' for PDFs and other non-image files
//     if (file.mimetype === "application/pdf" || file.mimetype === "video/mp4") {
//       resourceType = "raw";
//     }

//     return {
//       folder: "bvp_storage",
//       allowedFormats: ["png", "jpg", "jpeg", "pdf", "mp4"],
//       resource_type: resourceType,
//     };
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let resourceType = "auto"; // Automatically determine the resource type
    if (file.mimetype === "application/pdf" || file.mimetype === "video/mp4") {
      resourceType = "raw"; // Use raw for PDFs and videos
    }
    return {
      folder: "bvp_storage",
      allowedFormats: ["png", "jpg", "jpeg", "pdf", "mp4"],
      resource_type: resourceType,
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
