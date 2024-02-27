import { configureStore } from '@reduxjs/toolkit'
import modalReducer from "./src/slices/modalSlices"

export const store = configureStore({

               reducer:{
                              modals:modalReducer,


               }


}) 