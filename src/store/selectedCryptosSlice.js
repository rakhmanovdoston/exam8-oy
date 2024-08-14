import { createSlice } from "@reduxjs/toolkit";

export const selectedCryptos = createSlice({
    name:"selectedCryptos",
    initialState : {
        selectedCryptos: [],
    },
    reducers : {
        addSelectedCrypto: (state , action) => {
            state.selectedCryptos = action.payload
        } , 
        
    }
})

export const {addSelectedCrypto} = selectedCryptos.actions;
export default selectedCryptos.reducer;