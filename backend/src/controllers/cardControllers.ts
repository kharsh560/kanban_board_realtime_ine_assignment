import type { Request, Response } from "express";
import * as cardService from "../services/cardServices.ts";

export const createCard = async (req: Request, res: Response) => {
  try {
    const { title, parent_column_id, description, assignee_id } = req.body;
    const card = await cardService.createCard(title, parent_column_id, description, assignee_id);
    res.status(201).json(card);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const editCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Card ID is required." });
    }
    const card = await cardService.editCard(id, req.body);
    res.json(card);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Card ID is required." });
    }
    const result = await cardService.deleteCard(id);
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
