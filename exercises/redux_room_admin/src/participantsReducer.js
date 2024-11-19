// participantsReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Participant structure:
 * {
 *  id: string,
 *  name: string,
 * }
 */

/**
 * Room Structure:
 * {
 *  number: number,
 *  [participants: []],
 * }
 */

const roomCount = 9;

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch("/api/rooms");
  const data = await response.json();
  let rooms = Array.from({ length: roomCount }, (_, i) => ({}));
  data.forEach((room) => {
    rooms[room.number - 1] = {
      number: room.number,
      participants: room.participants.map((p) => ({
        id: p._id,
        name: p.name,
      })),
    };
  });
  return rooms;
});

export const fetchWaitingRoom = createAsyncThunk("rooms/fetchWaitingRoom", async () => {
  const response = await fetch("/api/waitingroom");
  const data = await response.json();
  return data.map((p) => ({id: p._id, name: p.name}));
});

const initialState = {
  waitingRoom: [], // Participants in the waiting room
  rooms: [], // Array of rooms by #
  roomCount: roomCount,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    addParticipant: (state, action) => {
      const { _id, name } = action.payload;
      // New participant is added to the waiting room
      state.waitingRoom.push({
        id: _id,
        name: name,
      });
    },
    removeParticipant: (state, action) => {
      const { participantId } = action.payload;
      state.rooms.forEach((room) => {
        const index = room.participants.findIndex((p) => p.id === participantId);
        if (index !== -1) {
          room.participants.splice(index, 1);
        }
      });
    },
    addToRoom: (state, action) => {
      const { participantId, roomIndex } = action.payload;
      // Find the participant in either the waiting room or other rooms
      // Remove the participant from that room
      let participant = state.waitingRoom.find((p) => p.id === participantId);
      if (participant) {
        state.waitingRoom = state.waitingRoom.filter(
          (p) => p.id !== participantId
        );
      } else {
        state.rooms.forEach((room) => {
          const index = room.participants.findIndex((p) => p.id === participantId);
          if (index !== -1) {
            participant = room.participants[index];
            room.participants.splice(index, 1);
          }
        });
      }
      state.rooms[roomIndex].participants.push(participant);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
    builder.addCase(fetchWaitingRoom.fulfilled, (state, action) => {
      state.waitingRoom = action.payload;
    });
  },
});

export const { addParticipant, removeParticipant, addToRoom } =
  roomsSlice.actions;

export default roomsSlice.reducer;
