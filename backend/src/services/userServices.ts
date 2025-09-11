import User from "../models/User.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Instance method: Generate Access Token
function generateTokens(id : string, email : string, user_name : string) : {accessToken : string, refreshToken : string} {

  function generateAccessToken(): string {
      return jwt.sign(
      {
          id: id,
          email: email,
          user_name: user_name,
          // message: "Hola Amigos!"
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {expiresIn : "1d"}
      );
  }
  
  function generateRefreshToken(): string {
      return jwt.sign(
      {
          id: id,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      {expiresIn : "7d"}
      );
  }

  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken();

  return {accessToken, refreshToken};

}

function excludePassword(user: any) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== "password")
  );
}

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

    const userData = user.dataValues;

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }


    const {accessToken, refreshToken} = generateTokens(userData.id, userData.email, userData.user_name);

    const sanitizedUser = excludePassword(userData);


    return { user : sanitizedUser, accessToken, refreshToken };
  } catch (err: any) {
    throw new Error(err.message || "Error while signing in user");
  }
};

export const signOutUser = async () => {
  return { message: "User signed out successfully" };
};

export const checkSession = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized request!");
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }

  // Sequelize equivalent of findById
  const user = await User.findByPk(decoded?.id, {
    attributes: { exclude: ["password"] }, // hide password
  });

  if (!user) {
    throw new Error("Invalid access token.");
  }

  return user;
};