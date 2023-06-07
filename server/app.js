require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const movieRouter = require("./routes/movie");

//global middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello world from Index page ");
});
// Route Middleware
app.use("/api/users", userRouter);
app.use("/api/actors", actorRouter);
app.use("/api/movies", movieRouter);

// 404 route
app.use("/*", (req, res) => {
   return res.status(404).json({ error: "Page Not Found" });
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
