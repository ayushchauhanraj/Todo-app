module.exports = {
  ...require("./auth"),
  ...require("./todo"),
};

module.exports.error = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    sucess: false,
    error: {
      message: err.message || "Something went Wrong",
    },
  });
};
