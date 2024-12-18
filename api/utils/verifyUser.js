import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("TOKEN", token);
  if (!token) {
    return next(errorHandler(401, "Unauthorized unable to verify"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return next(errorHandler(401, "Unauthorized"));
    }
    console.log(user, "USER in Verify Token");
    req.user = user;
    console.log(req.user, "REQ USER in Verify Token");

    next();
  });
};
