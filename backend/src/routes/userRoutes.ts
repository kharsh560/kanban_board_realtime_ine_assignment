import { Router } from "express";
import { registerUser, signIn, signOut, verifySession } from "../controllers/userController.ts";
import { verifyJWT } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/verifySession", verifyJWT, verifySession);


export default router;
