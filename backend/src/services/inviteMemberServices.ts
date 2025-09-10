import BoardMember from "../models/BoardMember.ts";

export const inviteMember = async (board_id: string, user_id: string, role: "owner" | "editor" | "viewer" = "viewer") => {
  return BoardMember.create({ board_id, user_id, role });
};

export const removeMember = async (board_id: string, user_id: string) => {
  const member = await BoardMember.findOne({ where: { board_id, user_id } });
  if (!member) throw new Error("Member not found");
  await member.destroy();
  return { message: "Member removed" };
};
