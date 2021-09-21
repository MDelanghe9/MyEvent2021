import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  getAllUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/all").get(getAllUser);

export default router;