import { DataTypes, Model } from "sequelize";
import type {Optional} from "sequelize";
import { sequelize } from "../config/config.ts";

interface BoardMemberAttributes {
  id: string;
  board_id: string;
  user_id: string;
  role?: "owner" | "editor" | "viewer";
  created_at?: Date;
  updated_at?: Date;
}

interface BoardMemberCreationAttributes extends Optional<BoardMemberAttributes, "id" | "role" | "created_at" | "updated_at"> {}

class BoardMember extends Model<BoardMemberAttributes, BoardMemberCreationAttributes> implements BoardMemberAttributes {
  public id!: string;
  public board_id!: string;
  public user_id!: string;
  public role?: "owner" | "editor" | "viewer";
  public created_at!: Date;
  public updated_at!: Date;
}

BoardMember.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    board_id: { type: DataTypes.UUID, allowNull: false },
    user_id: { type: DataTypes.UUID, allowNull: false },
    role: { type: DataTypes.ENUM("owner", "editor", "viewer"), defaultValue: "viewer" },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "board_members", timestamps: false, freezeTableName: true }
);

export default BoardMember;
