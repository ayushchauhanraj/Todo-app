const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, "mynameisdicter", (err, decoded) => {
      if (err) {
        // res.json({
        //   success: false,
        //   message: 'Failed to authenticate token',
        // });
        next(Error("Failed to Authenticate token"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // res.status(403).json({
    //   status: false,
    //   message: 'No token provided',
    // });

    next(Error("Please Login again"));
  }
};
