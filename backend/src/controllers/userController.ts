import type { Request, Response } from "express";
import * as userService from "../services/userServices.ts";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, user_name } = req.body;

    if (!email || !password || !user_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await userService.createUser(email, password, user_name);
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const {user, accessToken, refreshToken} = await userService.signInUser(email, password);
    
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    res.json({ message: "Signed in successfully", user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const signOut = async (_req: Request, res: Response) => {
  const result = await userService.signOutUser();
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(result);
};
