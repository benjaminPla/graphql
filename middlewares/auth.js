import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        res.status(403).send(error);
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.sendStatus(401);
  }
};

export default authMiddleware;
