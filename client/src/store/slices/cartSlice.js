import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        set: (state, action) => {
            const cart = action.payload || initialState;
            return cart;
        },
        add: (state, action) => {
            const wineId = action.payload;
            state[wineId] = (state[wineId] || 0) + 1;
        },
        subtract: (state, action) => {
            const wineId = action.payload;
            state[wineId] = Math.max(1, state[wineId] - 1);
        },
        remove: (state, action) => {
            const wineId = action.payload;
            delete state[wineId];
        },
        reset: (state) => initialState,
    }
});

export const selectCart = (state) => state.cart;

export const {set, add, subtract, remove, reset} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const loadCart = () => {
    return (dispatch) => {
        const content = localStorage.getItem('cart');
        if (content) {
            let cart = JSON.parse(content);
            dispatch(set(cart));
        } else {
            localStorage.setItem('cart', '{}');
        }
    };
};

export const addItem = (wineId) => {
    return (dispatch, getState) => {
        dispatch(add(wineId));
        localStorage.setItem('cart', JSON.stringify(getState().cart));
    };
};

export const subtractItem = (wineId) => {
    return (dispatch, getState) => {
        dispatch(subtract(wineId));
        localStorage.setItem('cart', JSON.stringify(getState().cart));
    };
};

export const removeItem = (wineId) => {
    return (dispatch, getState) => {
        dispatch(remove(wineId));
        localStorage.setItem('cart', JSON.stringify(getState().cart));
    };
};