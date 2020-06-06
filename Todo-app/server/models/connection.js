const mongoose = require("mongoose");

// Connection URL
const url ='YOUR _ DBURL'

// Use connect method to connect to the Server
const connectDB = async () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then()
    .catch();
};

module.exports = connectDB;
