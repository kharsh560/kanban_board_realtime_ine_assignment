import User from "../models/User.ts";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string, user_name: string) => {
  // hash the plain password
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS); 
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // save into DB
  const user = await User.create({ email, password: hashedPassword, user_name });
  return user;
};

export const signInUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    // console.log("user = ", user);
    // console.log("password = ", password);
    // console.log("user.password = ", user.dataValues.password);

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return { user, accessToken, refreshToken };
  } catch (err: any) {
    throw new Error(err.message || "Error while signing in user");
  }
};

export const signOutUser = async () => {
  return { message: "User signed out successfully" };
};