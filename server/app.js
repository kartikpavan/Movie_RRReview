require("dotenv").config();
require("express-async-errors");
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

// global async-error handler
app.use((err, req, res, next) => {
   console.log("err : ", err);
   res.status(500).json({ error: err.message || err });
   next();
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
