import { configureStore } from "@reduxjs/toolkit";
// import counterReducr from './components/redux-demo/counterSlice';
import loginReducer from "./components/LoginPage/loginSlice";
import dispatcherReducer from "./components/DispatcherSPA/dispatcherSlice";
import usersReducer from "../src/components/DispatcherSPA/UsersSlice"

export default configureStore({
    reducer: {
        // counter: counterReducer,
        login: loginReducer,
        dispatcher: dispatcherReducer,
        users: usersReducer,
    },
})