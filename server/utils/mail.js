const nodemailer = require("nodemailer");

const generateOTP = (totalDigits = 6) => {
   // generate OTP (6 digits)
   let OTP = "";
   for (let i = 1; i <= totalDigits; i++) {
      const randomNumber = Math.ceil(Math.random() * 9);
      OTP = OTP + randomNumber;
   }
   return OTP;
};

const generateMailTransporter = () => {
   return nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: process.env.NODEMAILER_USER,
         pass: process.env.NODEMAILER_PASSWORD,
      },
   });
};

module.exports = { generateOTP, generateMailTransporter };
