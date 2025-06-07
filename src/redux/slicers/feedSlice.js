import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {
        feed: []
    },
    reducers: {
        setFeed: (state, { payload }) => {
            state.feed = payload;
        },
        removeUserFromFeed: (state, { payload }) => {
            state.feed = state.feed.filter((f) => payload._id !== f._id)
        }
    }
})

export const { setFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;