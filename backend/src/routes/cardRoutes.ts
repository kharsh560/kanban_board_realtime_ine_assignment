import { Router } from "express";
import { createCard, editCard, deleteCard } from "../controllers/cardControllers.ts";

const router = Router();

router.post("/create", createCard);
router.put("/edit/:id", editCard);
router.delete("/delete/:id", deleteCard);

export default router;