import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  value: 0,
  isLoggedIn: false,
};

export const usersSlice = createSlice({
  name: "users",
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
    signIn: (state, action) => {
      state.isLoggedIn = true;
    },
    signOut: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export const { increment, decrement, incrementByAmount, signIn, signOut } =
  usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state) => state.counter.value;
const userReducer = usersSlice.reducer;
export default userReducer;
