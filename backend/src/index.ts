import express from "express";
import dotenv from "dotenv";
import {sequelize} from "./config/config.ts";
// Routes' imports
import userRoutes from "./routes/userRoutes.ts";
import boardRoutes from "./routes/boardRoutes.ts";
import columnRoutes from "./routes/columnRoutes.ts";
import cardRoutes from "./routes/cardRoutes.ts";
import inviteRoutes from "./routes/inviteMemberRoutes.ts";


dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/board", boardRoutes);
app.use("/column", columnRoutes);
app.use("/card", cardRoutes);
app.use("/invite", inviteRoutes);

// DB connection test
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection failed:", err));

const PORT = process.env.DEV_PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
