import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const getDeliveries = createAsyncThunk('delivery/getDeliveries', async () => {
    return (await api.get('/api/delivery/deliveries')).data;
});

export const addDelivery = createAsyncThunk('delivery/addDelivery', async (delivery) => {
    return (await api.post('/api/delivery/deliveries', delivery)).data;
});

export const deleteDelivery = createAsyncThunk('delivery/deleteDelivery', async (delivery) => {
    return (await api.delete(`/api/delivery/deliveries/${delivery.id}`)).data;
});

const initialState = {
    deliveries: [],
};

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {},
    extraReducers: {
        [getDeliveries.fulfilled]: (state, { payload }) => {
            state.deliveries = payload;
        },
        [addDelivery.fulfilled]: (state, { payload }) => {
            state.deliveries.push(payload);
        },
        [deleteDelivery.fulfilled]: (state, { payload }) => {
          const deliveryIndex = state.deliveries.findIndex(delivery => delivery.id === payload.id);
          state.deliveries.splice(deliveryIndex, 1);
      },
    },
});

export default deliverySlice.reducer;
