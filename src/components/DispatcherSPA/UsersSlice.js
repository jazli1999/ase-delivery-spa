import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    return (await api.get('/api/delivery/users')).data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
    console.log('input', user)
    return (await api.put('/api/delivery/user', user)).data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
    return (await api.post('/api/delivery/user', user)).data;
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
            console.log('updated user', payload);
            const userIndex = state[payload.role + 's'].findIndex(user => user.role === payload.role && user.key === payload.key);
            console.log('old item', state[payload.role + 's'][userIndex]);
            state[payload.role + 's'][userIndex] = payload;
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
    },
});

export default usersSlice.reducer