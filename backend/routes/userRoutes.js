import express from "express";
import {
  authUser,
  registerUser,
  updateUserProfile,
  getAllUser,
  one,
  updateInfo,
  allPartys
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/all").get(getAllUser);
router.route("/one").post(one);
router.route("/updateInfo").post(updateInfo);
router.route("/allPartys").post(allPartys);



export default router;