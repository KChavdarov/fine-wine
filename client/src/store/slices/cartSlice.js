import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            state.push(action.payload);
        },
        remove: (state, action) => {
            return state.filter(i => i !== action.payload);
        },
        reset: (state) => initialState,
    }
});

export const selectCart = (state) => state.cart;

export const {add, remove, reset} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;