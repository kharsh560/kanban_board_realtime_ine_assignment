import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationProvider";
import { logout } from "../reduxStateManagementFiles/authSlice";
import type { RootAuthState } from "../reduxStateManagementFiles/store";
import { clearSocket } from "../reduxStateManagementFiles/WebSocketSlice";


const Navbar: React.FC = () => {
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: RootAuthState) => state.auth.isLoggedIn);
  const userData = useSelector((state: RootAuthState) => state.auth.userData as { user_name?: string } | null);

  const socket = useSelector((state : RootAuthState) => state.socket.socket);

  const signOut = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/signout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error("Signout failed");
      }

      await response.json();
      if (socket) {
          // socket.send(JSON.stringify({ userId, message: `Client: ${userId} is closing the socket connection!` }));
          // const newActiveChat = activeChat;
          // sendWsMessage(messageTypes.closingConnection, `Client: ${userName} has closed the socket connection!`, newActiveChat)
          console.log("Closing the socket connection!");
          (socket as WebSocket).close();
          dispatch(clearSocket());
          // dispatch(resetActiveChat());
      }
      showNotification("success", "Signed out successfully!");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error during signout:", error);
      showNotification("error", "Signout failed!");
    }
  };

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      await signOut();
    } else {
      navigate("/signin");
    }
  };

  return (
    <nav className="flex items-center justify-between bg-gray-900 px-6 py-4 shadow-md">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer text-2xl font-bold text-indigo-400"
      >
        kanban
      </div>

      <div className="flex flex-row items-center gap-2 ">
        <div
            onClick={() => navigate("/")}
            className="cursor-pointer text-xl font-bold text-gray-400"
        >
            Welcome back {userData?.user_name} !
        </div>
        {/* Auth button */}
        <button
            onClick={handleAuthClick}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
            {isLoggedIn ? "Sign Out" : "Sign In"}
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
