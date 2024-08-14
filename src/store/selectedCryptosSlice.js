import { createSlice } from "@reduxjs/toolkit";

export const selectedCryptos = createSlice({
    name:"selectedCryptos",
    initialState : {
        selectedCryptos: []
    },
    reducers : {
        add: (state , action) => {
            state.selectedCryptos = action.payload
        }
    }
})

export const {add} = selectedCryptos.actions;
export default selectedCryptos.reducer;