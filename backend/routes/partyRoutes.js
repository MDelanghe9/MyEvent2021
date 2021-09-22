import express from "express";
import {
  partyCreat,
  cancelParty,
  getAllPartys,
  newMessage,
  getParty,
  askInvitation,
  refuseInvitation,
  acceptInvitation,
  kickUser,
  inviteUser,
  cancelInvite,
  leaveParty,
  deleteMsg,
  setFieldParty,
  setVisibility
} from "../controllers/partyController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/creatparty").post(partyCreat);
router.route("/cancelParty").post(cancelParty);
router.route("/all").get(getAllPartys);
router.route("/chat").put(newMessage);
router.route("/chat").post(getParty);
router.route("/askInvitation").post(askInvitation);
router.route("/refuseInvitation").post(refuseInvitation);
router.route("/acceptInvitation").post(acceptInvitation);
router.route("/kickUser").post(kickUser);
router.route("/inviteUser").post(inviteUser);
router.route("/cancelInvite").post(cancelInvite);
router.route("/leaveParty").post(leaveParty);
router.route("/deleteMsg").post(deleteMsg);
router.route("/setFieldParty").post(setFieldParty);
router.route("/setVisibility").post(setVisibility);

export default router;