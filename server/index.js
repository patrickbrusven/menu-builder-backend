const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_CONNECTION;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("connected to db");
    },
    (error) => {
      console.log("Database cound't be connected to: " + error);
    }
  );

const app = express();

// Middleware for dependencies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
const menusRoute = require("./routes/menuRte.js");
const usersRoute = require("./routes/userRte.js");
const authRoute = require("./routes/authorizationRte.js");
app.use("/api/menus", menusRoute);
app.use("/api/users", usersRoute);
app.use("/api", authRoute);

if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public/"));
  // handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 3000;

// Error handling middle ware
app.use((req, res, next) => {
  const err = new Error("route option not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => console.log(`server started on port ${port}`));
