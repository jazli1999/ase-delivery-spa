import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    return (await api.get('/api/delivery/users')).data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
    return (await api.put('/api/delivery/users', user)).data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
    return (await api.post('/api/delivery/users', user)).data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (user) => {
    await api.delete(`/api/delivery/user/${user.username}`);
    return user;
});

const initialState = {
    customers: [],
    deliverers: [],
    dispatchers: [],
    getUsersLoading: false,
    updateUserLoading: false,
    addUserLoading: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.getUsersLoading = true;
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.getUsersLoading = false;
            state.customers = [];
            state.deliverers = [];
            state.dispatchers = [];
            for (const user of payload) {
                state[user.role + 's'].push(user);
            }
        },
        [getUsers.rejected]: (state) => {
            state.getUsersLoading = false;
        },
        [updateUser.pending]: (state) => {
            state.updateUserLoading = true;
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.updateUserLoading = false;
            const userIndex = state[payload.role + 's'].findIndex(user => user.username === payload.username);
            if (userIndex >= 0) {
                state[payload.role + 's'][userIndex] = payload;
            }
        },
        [updateUser.rejected]: (state) => {
            state.updateUserLoading = false;
        },
        [addUser.pending]: (state) => {
            state.addUserLoading = true;
        },
        [addUser.fulfilled]: (state, { payload }) => {
            state.addUserLoading = false;
            state[payload.role + 's'].push(payload);
        },
        [addUser.rejected]: (state) => {
            state.addUserLoading = false;
        },
        [deleteUser.fulfilled]: (state, { payload }) => {
            const userIndex = state[payload.role + 's'].findIndex(user => user.username === payload.username);
            if (userIndex >= 0) {
                state[payload.role + 's'].splice(userIndex, 1);
            }
        },
    },
});

export default usersSlice.reducer;
