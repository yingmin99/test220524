const express = require("express");
const app = express();
const path = require("path");
const config = require("./config/key"); //key 설정 모듈
const port = process.env.PORT || 5001;
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//application/x-www-form-urlencorded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//분리한 router 사용
app.use("/api/users", require("./routes/users"));
app.use("/api/data", require("./routes/data"));
app.use("/api/post", require("./routes/post"));
//app.use('/api/favorite', require('./routes/favorite'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../client/build")));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Dev app listening on port ${port}`);
});
