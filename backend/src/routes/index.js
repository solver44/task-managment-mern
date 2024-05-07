import express from "express";
import userRoutes from "./user.js";
import taskRoutes from "./task.js";
import { login, signup } from "../controllers/auth.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

router.post("/signup", signup);
router.post("/login", login);

export default router;
