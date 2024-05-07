import express from "express";
import taskController from "../controllers/task.js";
import middleware from "../middleware/index.js";

const router = express.Router();

// GET
router.get("/", middleware.adminGuard, taskController.getAllTask);
router.get(
  "/:taskId",
  middleware.verifyAccessToken,
  taskController.getTaskbyTaskId
);
router.get("/filter/byUser", middleware.verifyAccessToken, taskController.getTaskById);
router.get(
  "/filter/byStatus",
  middleware.adminGuard,
  taskController.getTasksByStatus
);
router.get("/data/dashboard", middleware.adminGuard, taskController.getTasksData);

// CREATE
router.post("/", middleware.adminGuard, taskController.createTask);

// UPDATE
router.put("/:taskId", middleware.adminGuard, taskController.editTask);
router.put(
  "/submit/:taskId",
  middleware.verifyAccessToken,
  taskController.submitTask
);

// DELETE
router.delete(
  "/:taskId",
  middleware.adminGuard,
  taskController.deleteTask
);

export default router;
