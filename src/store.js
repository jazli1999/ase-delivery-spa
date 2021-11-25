import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './components/redux-demo/counterSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
})