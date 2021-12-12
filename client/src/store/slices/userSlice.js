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
export const addFavorite = createAsyncThunk('user/addFavorite', async ({userId, wineId}, {rejectWithValue}) => {
    try {
        const user = await userService.addFavorite(userId, wineId);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
export const removeFavorite = createAsyncThunk('user/removeFavorite', async ({userId, wineId}, {rejectWithValue}) => {
    try {
        const user = await userService.removeFavorite(userId, wineId);
        return user;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        //  VERIFY
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
        //  LOGIN
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
        //  REGISTER
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
        //  LOGOUT
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
        //  ADD FAVORITE
        builder
            .addCase(addFavorite.pending, (state) => {
                state.status = 'loading';
                state.errors = [];
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.user = action.payload;
                    state.errors = [];
                }
            })
            .addCase(addFavorite.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            });
        //  REMOVE FAVORITE
        builder
            .addCase(removeFavorite.pending, (state) => {
                state.status = 'loading';
                state.errors = [];
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload) {
                    state.user = action.payload;
                    state.errors = [];
                }
            })
            .addCase(removeFavorite.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.payload;
            });
    }
});

export const userReducer = userSlice.reducer;

export const {loadUserRequest, loadUserSuccess, loadUserFail, userReset} = userSlice.actions;

export const selectUser = (state) => state.user;