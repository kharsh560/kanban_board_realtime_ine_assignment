import Column from "../models/Column.ts";

export const createColumn = async (title: string, parent_board_id: string, order: number) => {
  return Column.create({ title, parent_board_id, order });
};

export const editColumn = async (id: string, updates: Partial<{ title: string; order: number }>) => {
  const column = await Column.findByPk(id);
  if (!column) throw new Error("Column not found");
  await column.update(updates);
  return column;
};

export const deleteColumn = async (id: string) => {
  const column = await Column.findByPk(id);
  if (!column) throw new Error("Column not found");
  await column.destroy();
  return { message: "Column deleted" };
};
