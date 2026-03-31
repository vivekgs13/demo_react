import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    users: [],
    load: false,
    error: null
};

export const fetchUser = createAsyncThunk(
    "nav/fetchUsers",
    async () => {

        const response = await axios.get("https://fake-json-api.mock.beeceptor.com/users");
        return response.data;
    }
);


const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.load = true;
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.load = false;
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.load = false;
                state.error = action.error.message;
            })
    }

});

export default navSlice.reducer;