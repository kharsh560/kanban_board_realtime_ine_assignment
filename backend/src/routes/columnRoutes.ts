import { Router } from "express";
import { createColumn, editColumn, deleteColumn } from "../controllers/columnControllers.ts";

const router = Router();

router.post("/create", createColumn);
router.put("/edit/:id", editColumn);
router.delete("/delete/:id", deleteColumn);

export default router;
