import * as userService from '../../services/userService';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const guestUser = {
    _id: '',
    _createdAt: '',
    _updatedAt: '',
    _isAdmin: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    orders: [],
    favorites: [],
    cart: [],
};

const initialState = {
    isLoading: false,
    status: 'idle',
    user: guestUser,
    errors: [],
};


export const verify = createAsyncThunk('user/verify', async (_, {rejectWithValue}) => {
    try {
        const user = await userService.getUser();
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const login = createAsyncThunk('user/login', async (data, {rejectWithValue}) => {
    try {
        const user = await userService.login(data);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const register = createAsyncThunk('user/register', async (data, {rejectWithValue}) => {
    try {
        const user = await userService.register(data);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const logout = createAsyncThunk('user/logout', async (_, {rejectWithValue}) => {
    try {
        const user = await userService.logout();
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUserRequest: (state) => {
            state.isLoading = true;
        },
        loadUserSuccess: (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                state.user = action.payload;
            }
        },
        loadUserFail: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        userReset: (state) => initialState,
    },
    extraReducers(builder) {
        builder
            .addCase(verify.pending, (state) => {
                state.status = 'loading';
                state.errors = [];
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.user = action.payload;
                    state.errors = [];
                }
            })
            .addCase(verify.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            });

        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.errors = [];
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.user = action.payload;
                    state.errors = [];
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            });

        builder
            .addCase(register.pending, (state) => {
                state.status = 'loading';
                state.errors = [];
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.user = action.payload;
                    state.errors = [];
                }
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            });

        builder
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
                state.errors = [];
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = guestUser;
                state.errors = [];
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            });
    }
});

export const userReducer = userSlice.reducer;

export const {loadUserRequest, loadUserSuccess, loadUserFail, userReset} = userSlice.actions;

export const selectUser = (state) => state.user;