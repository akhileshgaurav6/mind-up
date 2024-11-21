import { createSlice } from "@reduxjs/toolkit";
import { increaseCount, resetCount } from "../actions/counterAction";

//create counter slice

const initialState = {
    count: 0,
  };

const counterSlice = createSlice(
    {
        name: "counter",
        initialState: initialState,
        reducers: {
            increment:(state) => {
                state.count+=1;
            },
            decrement:(state) => {
                state.count-=1;
            },
            incrementByAmount: (state, action) => {
                state.count = 0
                state.count = action.payload;
            },
            resetCounter: (state) => {
                state.count = 0;
            },
        },
        
    }
);

export default counterSlice.reducer;

export const { increment, decrement, incrementByAmount, resetCounter } = counterSlice.actions;


