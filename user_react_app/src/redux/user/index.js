import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  value: 0,
  isLoggedIn: true,
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    signIn: (state) => {
      state.isLoggedIn = true;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { increment, decrement, incrementByAmount, signIn, signOut } =
  counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
