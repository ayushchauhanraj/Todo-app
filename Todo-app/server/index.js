const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./models/connection");
const handle = require("./handlers");
const route = require("./routes");
const auth = require("./middlewares/auth");

const app = express();
mongodb();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/", route.auth);
app.use(auth);
app.use("/api", route.todo);

app.use((req, res, next) => {
  let err = new Error("not Found");
  err.status = 404;
  next(err);
});
app.use(handle.error);

app.listen(process.env.PORT || 5000, () => {
 
});
