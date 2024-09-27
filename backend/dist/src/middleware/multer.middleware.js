"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/profileImages");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
//     );
//   },
// });
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Dynamically set the folder based on the file fieldname
        if (file.fieldname === "profileImg") {
            cb(null, "./public/profileImages");
        }
        else if (file.fieldname === "licenseImg") {
            cb(null, "./public/licenseImages");
        }
        else {
            cb(new Error("Invalid file fieldname"), ""); // Handle unknown fieldname
        }
    },
    filename: function (req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
