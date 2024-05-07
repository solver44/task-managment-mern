import { Schema } from "mongoose";
import auth from "../utils/auth.js";

function checkToken(token, res, req, next) {
  try {
    const payload = auth.verifyToken(token);
    req.headers.userId = payload.id;
    if (next) next();
    return payload;
  } catch (error) {
    if (error?.name === "TokenExpiredError")
      res.status(401).send({ message: "Token expired" });
    else if (error?.name === "JsonWebTokenError")
      res.status(401).send({ message: error.message });
    else res.status(401).send({ message: "Invalid token" });
  }
}

const verifyAccessToken = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    checkToken(token, res, req, next);
  } else {
    res.status(401).send({ message: "No token found" });
  }
};

const adminGuard = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    let payload = checkToken(token, res, req);
    if (payload.role === "manager") next();
    else res.status(405).send({ message: "Only managers are allowed" });
  } else {
    res.status(401).send({ message: "No token found" });
  }
};

export default {
  verifyAccessToken,
  adminGuard,
};
