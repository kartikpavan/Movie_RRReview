const User = require("../models/user");

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
      const savedUser = await newUser.save();
      return res.status(200).json({ data: savedUser });
   } catch (error) {
      return res.status(500).json({ data: error }); // internal server
   }
};

module.exports = { createUser };
