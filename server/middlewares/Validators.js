const { check, validationResult } = require("express-validator");
const { genreData } = require("../utils/data");
const { isValidObjectId } = require("mongoose");

exports.userValidator = [
   check("name").trim().notEmpty().withMessage("Name is Missing"),
   check("email").normalizeEmail().isEmail().withMessage("Email is Invalid"),
   check("password")
      .trim()
      .notEmpty()
      .withMessage("Password is Missing")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password length must be between 6 & 12 characters long"),
];

exports.validateNewPassword = [
   check("newPassword")
      .trim()
      .notEmpty()
      .withMessage("Password is Missing")
      .isLength({ min: 6, max: 12 })
      .withMessage("Password length must be between 6 & 12 characters long"),
];

exports.signInValidator = [
   check("email").normalizeEmail().isEmail().withMessage("Email is Invalid"),
   check("password").trim().notEmpty().withMessage("Password is Missing"),
];

exports.actorUploadValidator = [
   check("name").trim().notEmpty().withMessage("Name is Missing"),
   check("description").trim().notEmpty().withMessage("Description is Missing"),
   check("gender").trim().notEmpty().withMessage("Gender is Missing"),
];

// Complex Movie Validator Logic
exports.movieUploadValidator = [
   check("title").trim().notEmpty().withMessage("title is Missing"),
   check("storyLine").trim().notEmpty().withMessage("Story line is Missing"),
   check("releaseDate").isDate().withMessage("Release Date is missing is Missing"),
   check("status").isIn(["public", "private"]).withMessage("Status can only be public or private"),
   check("type").trim().notEmpty().withMessage("Movie Type is Missing"),
   check("language").trim().notEmpty().withMessage("Language is Missing"),
   check("genres")
      .isArray()
      .withMessage("Genre must be array of strings")
      .custom((value, { req }) => {
         for (let genre of value) {
            if (!genreData.includes(genre)) {
               throw Error("Invalid Genre / Not Found");
            }
         }
      }),
   check("tags")
      .isArray({ min: 1 })
      .withMessage("Tags must be array of strings")
      .custom((value, { req }) => {
         for (let tag of value) {
            if (typeof tag !== "string") {
               throw Error("Tag must be string");
            }
         }
      }),
   check("cast")
      .isArray()
      .withMessage("Cast must be array of Objects!")
      .custom((value, { req }) => {
         for (let c of value) {
            if (!isValidObjectId(c.actor)) {
               throw Error("Invalid Cast id inside cast object");
            }
            if (!c.roleAs?.trim()) {
               throw Error("roleAs is missing inside cast object");
            }
            if (typeof c.leadActor !== "boolean") {
               throw Error("leadActor can only be Boolean  inside cast object");
            }
         }
      }),
   check("trailer")
      .isObject()
      .withMessage("Trailer must be object with url and public_id")
      .custom(({ url, public_id }) => {
         try {
            const result = new URL(url);
            if (!result.protocol.includes("http")) {
               throw Error("Trailer Url is invalid");
            }
            const arr = url.split("/");
            const publicId = arr[arr.length - 1] / split(".")[0];
            if (publicId === public_id) {
               throw Error("Trailer Public Id is invalid");
            }
         } catch (error) {
            throw Error("Trailer Url is invalid");
         }
      }),
   check("poster").custom((_, { req }) => {
      if (!req.file) throw Error("Poster file is missing");
   }),
];

// middleware
exports.validate = (req, res, next) => {
   const result = validationResult(req).array();
   if (result.length) {
      return res.status(403).json({ error: result[0].msg });
   }
   next();
};
