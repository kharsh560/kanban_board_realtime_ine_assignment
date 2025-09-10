import Card from "../models/Card.ts";

export const createCard = async (title: string, parent_column_id: string, description?: string, assignee_id?: string) => {
  return Card.create({ title, description, parent_column_id, assignee_id });
};

export const editCard = async (id: string, updates: Partial<{ title: string; description: string; assignee_id: string }>) => {
  const card = await Card.findByPk(id);
  if (!card) throw new Error("Card not found");
  await card.update(updates);
  return card;
};

export const deleteCard = async (id: string) => {
  const card = await Card.findByPk(id);
  if (!card) throw new Error("Card not found");
  await card.destroy();
  return { message: "Card deleted" };
};
