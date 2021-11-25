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
            state.uid = action.payload.uid;
            state.uname = action.payload.uname;
        }
    }
})

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;