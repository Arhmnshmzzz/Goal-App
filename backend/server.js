const express = require("express");

const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

app.use(cors());

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//serve frontend

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Goal/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "Goal", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to Production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
