import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        userRole: null,
        uid: null,
        uname: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.userRole = action.payload.userRole;
            // state.uid = action.payload.uid;
            state.uid = '61ee9dc0818c905a54c2126d';
            state.uname = action.payload.uname;
        }
    }
})

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;