import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducFeatures/userSlice"
//"../../features/userSlice";

export default configureStore ({
    reducer: {
        user:userReducer,
    },
})