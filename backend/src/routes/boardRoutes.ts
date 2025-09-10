import { Router } from "express";
import { createBoard, editBoard, deleteBoard } from "../controllers/boardControllers.ts";

const router = Router();

router.post("/create", createBoard);
router.put("/edit/:id", editBoard);
router.delete("/delete/:id", deleteBoard);


export default router;