import { createSlice } from "@reduxjs/toolkit";

export const cryptoSlice = createSlice({
    name:"crypto",
    initialState : {
        cryptos: [],
        loading: false,
        error: null,
        selectedCurrency: "USD"
    },
    reducers : {
        addCryptos : (state, action) => {
            state.cryptos = action.payload
        },
        setLoading: (state , action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setSelectedCurrency: (state, action) => {
            state.selectedCurrency = action.payload
        }
        
    }
})

export const {addCryptos , setLoading , setError , setSelectedCurrency} = cryptoSlice.actions;
export default cryptoSlice.reducer;