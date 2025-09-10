import { DataTypes, Model } from "sequelize";
import type {Optional} from "sequelize";
import { sequelize } from "../config/config.ts";

interface BoardAttributes {
  id: string;
  title: string;
  description?: string;
  owner_id: string;
  column_sequence?: string[];
  created_at?: Date;
  updated_at?: Date;
}

interface BoardCreationAttributes extends Optional<BoardAttributes, "id" | "description" | "column_sequence" | "created_at" | "updated_at"> {}

class Board extends Model<BoardAttributes, BoardCreationAttributes> implements BoardAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public owner_id!: string;
  public column_sequence?: string[];
  public created_at!: Date;
  public updated_at!: Date;
}

Board.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    owner_id: { type: DataTypes.UUID, allowNull: false },
    column_sequence: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "boards", timestamps: false, freezeTableName: true }
);

export default Board;
