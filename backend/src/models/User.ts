import { DataTypes, Model } from "sequelize";
import type {Optional} from "sequelize"
import {sequelize} from "../config/config.ts";
import jwt from "jsonwebtoken";


interface UserAttributes {
  id: string;
  email: string;
  password: string;
  user_name: string;
  created_at?: Date;
  updated_at?: Date;
}

// Allow optional fields for creation
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public user_name!: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Instance method: Generate Access Token
    public generateAccessToken(): string {
        return jwt.sign(
        {
            id: this.id,
            email: this.email,
            user_name: this.user_name,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {expiresIn : "5m"}
        );
    }

  // Instance method: Generate Refresh Token
    public generateRefreshToken(): string {
        return jwt.sign(
        {
            id: this.id,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {expiresIn : "7d"}
        );
    }

}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users", // match Supabase table
    timestamps: false,   // Supabase handles timestamps via triggers
    freezeTableName: true,
  }
);

export default User;
