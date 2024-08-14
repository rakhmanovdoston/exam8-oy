import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./cryptoSlice";
import selectedCryptosSlice from "./selectedCryptosSlice";

export default configureStore({
    reducer : {
        cryptoSlice , selectedCryptosSlice
    }
})