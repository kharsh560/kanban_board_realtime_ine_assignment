import { createSlice } from '@reduxjs/toolkit';

interface SocketState {
    socket: WebSocket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload?.socket;
    },
    clearSocket(state) {
      state.socket = null;
    }
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
