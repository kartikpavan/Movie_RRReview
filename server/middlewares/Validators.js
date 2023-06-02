const { check, validationResult } = require("express-validator");

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

// middleware
exports.validate = (req, res, next) => {
   const result = validationResult(req).array();
   if (result.length) {
      return res.status(403).json({ msg: result[0].msg });
   }
   next();
};
