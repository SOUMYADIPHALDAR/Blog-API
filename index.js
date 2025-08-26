require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { connect } = require("mongoose");
const connectDB = require("./src/config/db.js");
const router = require("./src/routes/user.router.js");
const blogRoute = require("./src/routes/blog.route.js");
const commentRoute = require("./src/routes/comment.route.js");

const app = express();
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 4000;

app.use("/api", router);
app.use("/blog", blogRoute);
app.use("/api", commentRoute);

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
})
.catch((error) => {
    console.log("Mongodb connection lost..", error);
});