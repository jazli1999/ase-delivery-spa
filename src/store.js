import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./components/LoginPage/loginSlice";
import dispatcherReducer from "./components/DispatcherSPA/dispatcherSlice";
import usersReducer from "../src/components/DispatcherSPA/usersSlice";

export default configureStore({
    reducer: {
        login: loginReducer,
        dispatcher: dispatcherReducer,
        users: usersReducer,
    },
});
