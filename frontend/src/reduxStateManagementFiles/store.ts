import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import socketReducer from "./WebSocketSlice"

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,  // Disable check because we store a non-serializable WebSocket instance.
  }),
});

export type RootAuthState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
