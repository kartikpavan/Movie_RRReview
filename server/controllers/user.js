const nodemailer = require("nodemailer");
const User = require("../models/user");
const EmailToken = require("../models/emailToken");
const { isValidObjectId } = require("mongoose");

//Create USER @POST
const createUser = async (req, res) => {
   const { name, email, password } = req.body;
   // checking for duplicate User entries
   const existingUser = await User.findOne({ email: email });
   if (existingUser) {
      return res.status(409).json({ msg: "User Email already exists" }); // Conflicting Email
   }
   // creating new user instance
   const newUser = User({
      name,
      email,
      password,
   });

   try {
      // saving user to DB
      const savedUser = await newUser.save();
      // generate OTP (6 digits)
      let OTP = "";
      for (let i = 0; i <= 5; i++) {
         const randomNumber = Math.ceil(Math.random() * 9);
         OTP = OTP + randomNumber;
      }
      // Store OTP inside DB
      const newEmailToken = EmailToken({
         owner: savedUser._id,
         token: OTP,
      });
      const savedEmailToken = await newEmailToken.save();
      // send OTP to user Email
      var transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASSWORD,
         },
      });

      const info = await transport.sendMail({
         from: "emailVerification@movieRRReview.com", // sender address
         to: newUser.email, // list of receivers
         subject: "Email Verification ✔", // Subject line
         html: `<p>Your Email Verification OTP : </p>
               <h1>${OTP}</h1>
         `, // html body
      });
      return res.status(201).json({
         msg: "OTP has been sent to your registered Email Address, Please Verify your email. ",
      });
      // return res.status(200).json({ data: savedUser });
   } catch (error) {
      return res.status(500).json({ data: error }); // internal server
   }
};

// verify Email
const verifyEmail = async (req, res) => {
   const { userId, OTP } = req.body;

   // checking if user exists in DB
   if (!isValidObjectId(userId))
      // isValidObjectId() is mongoose method
      return res.status(404).json({ msg: "Invalid User / User Not Found" });

   // find the user using the userId
   const currentUser = await User.findById(userId);
   if (!currentUser) return res.status(404).json({ msg: "Invalid User / User Not Found" });
   if (currentUser.isVerified) return res.status(409).json({ msg: "User is already Verified" });

   // getting the hashed OTP from the DB
   const token = await EmailToken.findOne({ owner: userId });
   if (!token) return res.status(404).json({ msg: "Invalid Token / Token Not Found" });

   // checking whether the OTP is valid
   const isMatched = await token.compareToken(OTP); // custom compareToken() method
   if (!isMatched) return res.status(400).json({ msg: "invalid OTP" });

   // if OTP is correct then update DB isVerified value to true and save
   currentUser.isVerified = true;
   await currentUser.save();

   // after successful verification , delete the OTP/token from Database
   await EmailToken.findByIdAndDelete(token._id);
   var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: process.env.NODEMAILER_USER,
         pass: process.env.NODEMAILER_PASSWORD,
      },
   });

   const info = await transport.sendMail({
      from: "emailVerification@movieRRReview.com", // sender address
      to: currentUser.email, // list of receivers
      subject: "Welcome Email ✔", // Subject line
      html: `<h1>Welcome to our App and thanks for choosing us</h1>`, // html body
   });
   return res.status(200).json({ msg: "Email Verification Successful" });
};

const resendOTP = async (req, res) => {
   const { userId } = req.body;
   // find the user details from our
   const currentUser = await User.findById(userId);
   if (!currentUser) return res.status(404).json({ msg: "Invalid User / User Not Found" });
   if (currentUser.isVerified)
      return res.status(409).json({ msg: "This User is already Verified" });

   // if token already exist
   const existingToken = await EmailToken.findOne({ owner: userId });
   if (existingToken)
      return res.status(409).json({ msg: "next Token request available after 1 hour" });

   // if token not found
   let OTP = "";
   for (let i = 0; i <= 5; i++) {
      const randomNumber = Math.ceil(Math.random() * 9);
      OTP = OTP + randomNumber;
   }
   // Store OTP inside DB
   const newEmailToken = EmailToken({
      owner: currentUser._id,
      token: OTP,
   });
   const savedEmailToken = await newEmailToken.save();
   // send OTP to user Email
   var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: process.env.NODEMAILER_USER,
         pass: process.env.NODEMAILER_PASSWORD,
      },
   });

   const info = await transport.sendMail({
      from: "emailVerification@movieRRReview.com", // sender address
      to: currentUser.email, // list of receivers
      subject: "Email Verification ✔", // Subject line
      html: `<p>Your Email Verification OTP : </p>
            <h1>${OTP}</h1>
      `, // html body
   });
   return res.status(201).json({
      msg: "OTP has been sent to your registered Email Address,Please Verify your email. ",
   });
};

module.exports = { createUser, verifyEmail, resendOTP };
