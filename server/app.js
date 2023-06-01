require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const userRouter = require("./routes/user");

//global middlewares
app.use(cors());
app.use(express.json());

// Route Middleware
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
   res.send("Hello world from Index page ");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`LISTENING on PORT ${PORT}`);
});

// Connection to the Mongo DB database
async function start() {
   await mongoose.connect(process.env.MONGO_URI);
}
start()
   .then(() => console.log("Connection to MONGODB established Successully"))
   .catch((error) => console.log("connection to the DB failed" + error));
