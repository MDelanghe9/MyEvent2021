import express from "express";
import {
  partyCreat,
  getAllPartys,
  newMessage,
} from "../controllers/partyController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/creatparty").post(partyCreat);
router.route("/all").get(getAllPartys);
router.route("/chat").put(newMessage);

export default router;