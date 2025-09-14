import { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type RootAuthState } from "../reduxStateManagementFiles/store";
import { setSocket } from "../reduxStateManagementFiles/WebSocketSlice";

export function useConnectWebSocket() {
  const dispatch = useDispatch();
  const socketRef = useRef<WebSocket | null>(null);

  const storedSocket = useSelector((state: RootAuthState) => state.socket.socket);

  const connectWebSocket = useCallback(async () => {
    console.log("Inside connectWebSocket!");
    console.log(storedSocket);

    if (storedSocket) return;

    try {
      // Step 1: Authenticate via HTTP
      const authRes = await fetch(`${import.meta.env.VITE_API_URL}/ws/initializeWS`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!authRes.ok) {
        throw new Error("Auth failed before WebSocket connection.");
      }

      const authResJson = await authRes.json();

    // NOTE: about line 33, 34: ❗️jsonwebtoken's verify() does not work in the browser! The jsonwebtoken library is Node.js-specific and depends on Node's crypto module, which is not available in browsers.

      // Step 2: Create WebSocket connection.
      // console.log("Establishing websicket connection. Token is: ", authResJson.token);
      const socketUrl = `${import.meta.env.VITE_WS_URL}/realTimeKanban/ws?token=${authResJson.token}`;
      // console.log("Making req to: ", socketUrl);
      const socket = new WebSocket(socketUrl);

      socket.onerror = (err) => {
        console.error("Closing socket due to WebSocket error:", err);
      };

      socket.onclose = () => {
        console.log("Closing socket!")
        dispatch(setSocket(null));
      };

      socketRef.current = socket;

      // Dispatch the socket to Redux state.
      if (!storedSocket) {
          dispatch(setSocket({socket}));
      }

      return socket;
    } catch (error) {
      console.error("WebSocket connection failed!", error);
      return null;
    }
  }, []);

  return { socket: socketRef.current, connectWebSocket };
}