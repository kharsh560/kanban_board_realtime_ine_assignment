import type { Request, Response } from "express";
import * as columnService from "../services/columnServices.ts";

export const createColumn = async (req: Request, res: Response) => {
  try {
    const { title, parent_board_id, order } = req.body;
    const column = await columnService.createColumn(title, parent_board_id, order);
    res.status(201).json(column);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const editColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Column ID is required." });
    }
    const column = await columnService.editColumn(id, req.body);
    res.json(column);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteColumn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Column ID is required." });
    }
    const result = await columnService.deleteColumn(id);
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
