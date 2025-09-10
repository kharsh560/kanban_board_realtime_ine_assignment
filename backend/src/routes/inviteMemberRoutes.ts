import { Router } from "express";
import { inviteMember, removeMember } from "../controllers/inviteMemberControllers.ts";

const router = Router();

router.post("/invite", inviteMember);
router.post("/remove", removeMember);

export default router;
