import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: "" || null
}

const globalState = createSlice({
    name: "state",
    initialState,
    reducers: {
        user: (state, { payload }) => {
            state.user = payload
        }
    }
});

export const {user} = globalState.actions

export default globalState.reducer