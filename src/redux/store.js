import { configureStore } from "@reduxjs/toolkit";
import userslice from './slicers/userSlice';
import connectSlice from './slicers/connectionSlice'
import feedSlice from './slicers/feedSlice'
const store = configureStore({
    reducer: {
        user: userslice,
        connection: connectSlice,
        feed: feedSlice
    }
})

export default store;