const express = require("express");
const app = express();

const userRouter = require("./routes/user");

// Route Middleware
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world from MAIN page ");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`LISTENING on PORT ${PORT}`);
});
