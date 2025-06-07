import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connectionSlice",
    initialState: {
        connections: {},
        requests: {}
    },
    reducers: {
        setConnection: (state, { payload }) => {
            state.connections = payload;
        },
        setRequests: (state, { payload }) => {
            state.requests = payload;
        }
    }
})

export const { setConnection, setRequests } = connectionSlice.actions;
export default connectionSlice.reducer;