const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const testingRouter = require("./controllers/testing");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const loginRouter = require("./controllers/login");
const config = require("./utils/config");
const tokenExtractor = require("./utils/tokenExtractor");

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGODB_URI);
app.use(cors());
app.use(express.json());
app.use(tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/testing", testingRouter);
module.exports = app;
