import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.ts"; // adjust path

// Extend Express Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: any; // You can replace `any` with a User type
  }
}

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    //   console.log("token = ", token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized request!" });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    } catch (err) {
      return res.status(401).clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({
      success: false,
      message: "Invalid or expired token!",
    });
    }

    // console.log("In middleware; decoded = ", decoded);

    const user = await User.findByPk(decoded?.id, {
      attributes: { exclude: ["password"] }, // hide password
    });

    // console.log("In middleware; user = ", user);

    if (!user?.dataValues) {
      return res.status(401).json({ error: "Invalid access token." });
    }
    // Sequelize mei user.dataValues karna padta hai unlike in mongoose. (which is direct mostly)
    req.user = user.dataValues; // ✅ inject user into request
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
