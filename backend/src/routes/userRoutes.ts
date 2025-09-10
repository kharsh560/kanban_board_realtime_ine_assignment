import { Router } from "express";
import { registerUser, signIn, signOut } from "../controllers/userController.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/signin", signIn);
router.post("/signout", signOut);


export default router;
