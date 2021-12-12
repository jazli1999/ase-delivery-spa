import { createSlice } from '@reduxjs/toolkit';

export const dispatcherSlice = createSlice({
    name: 'dispatcher',
    initialState: {
        controlPanel: 'customer',
    },
    reducers: {
        setPanel: (state, action) => {
            state.controlPanel = action.payload.controlPanel;
        }
    }
})

export const { setPanel } = dispatcherSlice.actions;

export default dispatcherSlice.reducer;
