import type { Request, Response } from "express";
import * as boardService from "../services/boardServices.ts";

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { title, description, owner_id } = req.body;
    const board = await boardService.createBoard(title, description, owner_id);
    res.status(201).json(board);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const editBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Board ID is required" });
    }
    const board = await boardService.editBoard(id, req.body);
    res.json(board);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Board ID is required" });
    }
    const result = await boardService.deleteBoard(id);
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
