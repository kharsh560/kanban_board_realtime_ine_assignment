import { DataTypes, Model } from "sequelize";
import type {Optional} from "sequelize";
import { sequelize } from "../config/config.ts";

interface ColumnAttributes {
  id: string;
  title: string;
  parent_board_id: string;
  order: number;
  card_sequence?: string[];
  created_at?: Date;
  updated_at?: Date;
}

interface ColumnCreationAttributes extends Optional<ColumnAttributes, "id" | "card_sequence" | "created_at" | "updated_at"> {}

class Column extends Model<ColumnAttributes, ColumnCreationAttributes> implements ColumnAttributes {
  public id!: string;
  public title!: string;
  public parent_board_id!: string;
  public order!: number;
  public card_sequence?: string[];
  public created_at!: Date;
  public updated_at!: Date;
}

Column.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    title: { type: DataTypes.STRING, allowNull: false },
    parent_board_id: { type: DataTypes.UUID, allowNull: false },
    order: { type: DataTypes.INTEGER, allowNull: false },
    card_sequence: { type: DataTypes.ARRAY(DataTypes.UUID), defaultValue: [] },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "columns", timestamps: false, freezeTableName: true }
);

export default Column;
