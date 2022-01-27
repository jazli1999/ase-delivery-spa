import { createSlice } from '@reduxjs/toolkit';

export const dispatcherSlice = createSlice({
    name: 'dispatcher',
    initialState: {
        currentTab: 'customer',
    },
    reducers: {
        setPanel: (state, action) => {
            state.currentTab = action.payload;
        }
    }
})

export const { setPanel } = dispatcherSlice.actions;

export default dispatcherSlice.reducer;
