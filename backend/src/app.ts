import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.ts";
import boardRoutes from "./routes/boardRoutes.ts";
import columnRoutes from "./routes/columnRoutes.ts";
import cardRoutes from "./routes/cardRoutes.ts";
import inviteRoutes from "./routes/inviteMemberRoutes.ts";
import webSocketInitializerRoutes from "./routes/webSocketInitializerRoutes.ts"
import cookieParser from "cookie-parser";

const app = express();

// console.log("process.env.DEV_CLIENT_URL = ", process.env.DEV_CLIENT_URL);

app.use(
  cors({
    origin: process.env.DEV_CLIENT_URL, 
    credentials: true, // as I'm using cookies / auth headers
  })
);


app.use(express.json());
app.use(cookieParser()); 

// Routes
app.use("/user", userRoutes);
app.use("/board", boardRoutes);
app.use("/column", columnRoutes);
app.use("/card", cardRoutes);
app.use("/invite", inviteRoutes);
app.use("/ws", webSocketInitializerRoutes)

export default app;