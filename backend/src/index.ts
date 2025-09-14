import dotenv from "dotenv";
import {sequelize} from "./config/config.ts";
import app from "./app.ts";
import http from "http";
import { setupWebSocketServer } from "./socketLogics/sockets.ts";


dotenv.config();

// Creating an HTTP server
const server = http.createServer(app);

// Set up WebSocket server
setupWebSocketServer(server); 

const PORT = process.env.DEV_PORT || 4000;

// DB connection test
sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection failed:", err));

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});