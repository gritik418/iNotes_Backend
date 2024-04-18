import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(401).json({
        success: false,
        status: 400,
        message: "Please Login.",
      });
    }

    req.user = {
      email: verify.email,
      id: verify.id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      status: 400,
      message: "Please Login.",
    });
  }
};

export default authenticate;
