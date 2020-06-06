const db = require("../models");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, userName } = user;
    const token = jwt.sign({ id, userName }, "mynameisdicter");
    return res.status(201).json({
      id,
      userName,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "sorry /username is already exits";
    }
    return next({
      status: 400,
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ userName: req.body.userName });
    const { id, userName } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, userName }, "mynameisdicter");
      return res.status(200).json({
        id,
        userName,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    return next({ status: 400, message: "Invalid userName/password" });
  }
};
