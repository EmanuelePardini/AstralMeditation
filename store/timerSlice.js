import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    countdown: 0,
    running: true,
  },
  reducers: {
    startTimer: (state,action) => {
        state.countdown = action.payload;
        state.initialState = action.payload;
        state.running = true;
    },
    stopTimer: state => {
      state.running = false;
    },
    
    restartTimer: state => {
        state.running = true;
      
    },
    resetTimer: state => {
        state.countdown = timerSlice.reducer.countdown;
        state.countdown = state.initialState;
          
        },
    setCountdown: (state, action) => {
      state.countdown = action.payload;
    },
  },
});

export const { startTimer, stopTimer, restartTimer, resetTimer, setCountdown } = timerSlice.actions;
export default timerSlice.reducer;
