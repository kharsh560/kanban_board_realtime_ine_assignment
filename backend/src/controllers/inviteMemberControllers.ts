import type { Request, Response } from "express";
import * as boardMemberService from "../services/inviteMemberServices.ts";

export const inviteMember = async (req: Request, res: Response) => {
  try {
    const { board_id, user_id, role } = req.body;
    const member = await boardMemberService.inviteMember(board_id, user_id, role);
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const { board_id, user_id } = req.body;
    const result = await boardMemberService.removeMember(board_id, user_id);
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
