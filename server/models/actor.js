const mongoose = require("mongoose");

const ActorSchema = mongoose.Schema(
   {
      name: {
         type: String,
         trim: true,
         required: true,
      },
      description: {
         type: String,
         trim: true,
         required: true,
      },
      gender: {
         type: String,
         trim: true,
         required: true,
      },
      avatar: {
         type: Object,
         url: String,
         public_id: String,
      },
   },
   { timestamps: true }
);

const Actor = mongoose.model("Actor", ActorSchema);
module.exports = Actor;
