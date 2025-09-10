import { DataTypes, Model } from "sequelize";
import type {Optional} from "sequelize";
import { sequelize } from "../config/config.ts";

interface CardAttributes {
  id: string;
  title: string;
  description?: string;
  parent_column_id: string;
  assignee_id?: string;
  labels?: string[];
  due_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

interface CardCreationAttributes extends Optional<CardAttributes, "id" | "description" | "assignee_id" | "labels" | "due_date" | "created_at" | "updated_at"> {}

class Card extends Model<CardAttributes, CardCreationAttributes> implements CardAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public parent_column_id!: string;
  public assignee_id?: string;
  public labels?: string[];
  public due_date?: Date;
  public created_at!: Date;
  public updated_at!: Date;
}

Card.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    parent_column_id: { type: DataTypes.UUID, allowNull: false },
    assignee_id: { type: DataTypes.UUID },
    labels: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    due_date: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "cards", timestamps: false, freezeTableName: true }
);

export default Card;
