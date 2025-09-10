import Board from "../models/Board.ts";
import User from "../models/User.ts";


export const createBoard = async (title: string, description: string, owner_id: string) => {
  const owner = await User.findByPk(owner_id);
  if (!owner) {
    throw new Error("Owner does not exist");
  }

  return Board.create({ title, description, owner_id });
};

export const editBoard = async (id: string, updates: Partial<{ title: string; description: string }>) => {
  const board = await Board.findByPk(id);
  if (!board) throw new Error("Board not found");
  await board.update(updates);
  return board;
};

export const deleteBoard = async (id: string) => {
  const board = await Board.findByPk(id);
  if (!board) throw new Error("Board not found");
  await board.destroy();
  return { message: "Board deleted" };
};
