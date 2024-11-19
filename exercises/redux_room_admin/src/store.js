// store.js
import { configureStore } from '@reduxjs/toolkit';
import participantsReducer from './participantsReducer';

const store = configureStore({
  reducer: {
    participants: participantsReducer, // You can add other reducers here if needed
  },
});

export default store;
