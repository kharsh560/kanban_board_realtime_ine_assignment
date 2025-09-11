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
    
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict", });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict", });

    // console.log("user = ", user);

    res.json({ message: "Signed in successfully", user, accessToken });
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

export const verifySession = async (req: Request, res: Response) => {
    const user = req.user;
    // console.log("user = ", user);
    if (user) {
        return res.status(200).json({
            success: true,
            user,
        });
    }

    // console.log("Unauthorized request!");
    return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({
      success: false,
      message: "Unauthorized request!",
    });
};
