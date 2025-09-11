import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.ts";
import { webSocketInitializer } from "../controllers/webSocketInitializerController.ts";

const router = Router();

router.get("/initializeWS", verifyJWT, webSocketInitializer);

export default router;
