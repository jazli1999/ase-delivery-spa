import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const getDeliveries = createAsyncThunk('delivery/getDeliveries', async () => {
    return (await api.get('/api/delivery/deliveries')).data;
});

export const addDelivery = createAsyncThunk('delivery/addDelivery', async (delivery) => {
    return (await api.post('/api/delivery/deliveries', delivery)).data;
});

export const updateDelivery = createAsyncThunk('delivery/updateDelivery', async (delivery) => {
    return (await api.put('/api/delivery/deliveries', delivery)).data;
});

export const deleteDelivery = createAsyncThunk('delivery/deleteDelivery', async (trackingCode) => {
    await api.delete(`/api/delivery/deliveries/${trackingCode}`);
    return trackingCode;
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
          const deliveryIndex = state.deliveries.findIndex(delivery => delivery.trackingCode === payload);
          console.log(deliveryIndex, state.deliveries)
          if (deliveryIndex >= 0) {
            state.deliveries.splice(deliveryIndex, 1);
          }
      },
    },
});

export default deliverySlice.reducer;
