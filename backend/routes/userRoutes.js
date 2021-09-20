import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  userCreatParty,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/creatparty").post(userCreatParty);

export default router;