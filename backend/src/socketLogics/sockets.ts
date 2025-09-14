import { Server as HTTPServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
// import { v4 as uuidv4 } from "uuid";
import { parse } from "url";
import jwt from "jsonwebtoken"

type decodedTokenPayload = {
    user: {
        id: string;
        email: string;
        user_name: string;
        created_at: string;
        updated_at: string;
    },
    iat: number;
    exp: number;
}

const clients = new Map<string, WebSocket>();
// This is the map of clients connected through websockets.
// clients will map indv_client_uuid -> WS

// const conversationRooms = new Map<string, string[]>();
// Map of strings to a Set of strings
const conversationRooms = new Map<string, Set<string>>();
// This will have the UUID of the conversation, which is a unique identifier of a room...
// ...which can have either duplets or many. Means a 1-1 chat or a grp chat.
// conversationRooms will map room -> indv(in form of their UUID of whose WS can be accessed through "conversationRooms")

export function setupWebSocketServer(server: HTTPServer) {
//   const wss = new WebSocketServer({ server, path: "/realTimeChat/ws" });
//NOTE console.log("Inside here: /realTimeKanban/ws");  Arrey, this will log at the server start itself.
  const wss = new WebSocketServer({ noServer: true, path: "/realTimeKanban/ws" });
    // let decoded : decodedTokenPayload;
    console.log("Inside here: /realTimeKanban/ws");
    server.on("upgrade", (req, socket, head) => {
        console.log("IUpgrading connection")
        const { query } = parse(req.url!, true); // Extract query params
        const token = query.token as string; // Get clientId from URL
        let decoded : decodedTokenPayload;

        try {
            const decodedToken = jwt.verify(token, process.env.WEB_SOCKET_VALIDATION_SECRET as string);
            if (typeof decodedToken === "object" && decodedToken !== null) {
                decoded = decodedToken as decodedTokenPayload;
            } else {
                throw new Error("Invalid token payload");
            }
            // console.log("decoded token: ", decoded);
        } catch (error) {
            console.log("Authentication failed, destroying the wss connection.");
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }

        if (clients.has(decoded.user.id)) {
            console.log("This client already exists, destroying the wss connection.");
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }

        console.log("Authentication passed, upgrading the connection.");
        

        // If authentication passes, upgrade the connection.
        // Upgrade the connection and pass the decoded token along via the request object or directly attach it to the ws instance.
        wss.handleUpgrade(req, socket, head, (ws) => {
          // Attach the decoded data to the WebSocket instance, making it unique per connection:
          (ws as any).decoded = decoded;
          wss.emit("connection", ws, req);
        });
  });

  wss.on("connection", (ws: WebSocket) => {
    // Now, use the decoded token from this connection instance.
    const decoded : decodedTokenPayload = (ws as any).decoded;
    const client = decoded.user;
    const clientId = client.id;
    const clientUserName = client.user_name;
    clients.set(clientId, ws);

    console.log(`Client '${clientUserName}' connected with ID: ${clientId}. Total clients = ${clients.size}`);

    ws.send(JSON.stringify({ system: "Welcome!", clientId, name: clientUserName }));

    ws.on("close", () => {
      clients.delete(clientId);
      // console.log(clients.size);
      console.log(`Socket connection closed for ${clientId}. Clients remaining: ${clients.size}`);
      // messageQueue.getItems().forEach((eachMessage) => console.log(eachMessage.message));
    });
  });
}
