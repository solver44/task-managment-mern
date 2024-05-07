import express from "express";
import middleware from "../middleware/index.js";
import UserController from "../controllers/user.js";

const router = express.Router();

router.post(
  "/",
  middleware.adminGuard,
  UserController.registerUser
);
router.get(
  "/",
  middleware.verifyAccessToken,
  UserController.getUserData
);
router.get(
  "/:id",
  middleware.adminGuard,
  UserController.getIndividualUser
);
router.put(
  "/:id",
  middleware.adminGuard,
  UserController.updateUserData
);
router.delete("/:id", middleware.adminGuard, UserController.deleteUser);

export default router;
