import { configureStore } from "@reduxjs/toolkit";
// import counterReducr from './components/redux-demo/counterSlice';
import loginReducer from "./components/LoginPage/loginSlice";

export default configureStore({
    reducer: {
        // counter: counterReducer,
        login: loginReducer
    },
})