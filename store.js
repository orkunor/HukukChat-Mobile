import { configureStore } from '@reduxjs/toolkit'
import modalReducer from "./src/slices/modalSlices"
import authReducer from "./src/slices/authSlices"
import userReducer from "./src/slices/userSlices"
export const store = configureStore({

               reducer:{
                              modals:modalReducer,
                              auth:authReducer,
                              user:userReducer


               }


}) 