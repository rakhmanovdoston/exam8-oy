import { createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCryptos,
  setError,
  setLoading,
  setSelectedCurrency,
} from "./cryptoSlice";

export const CryptoContext = createContext();

export default function CryptoProvider({ children }) {
  const { selectedCryptosSlice, cryptoSlice } = useSelector((store) => store);
  const { selectedCryptos } = selectedCryptosSlice;
  const { cryptos, error, loading, selectedCurrency } = cryptoSlice;

  const dispatch = useDispatch();

  return (
    <CryptoContext.Provider
      value={{
        selectedCryptos,
        cryptos,
        dispatch,
        addCryptos,
        setError,
        setLoading,
        error,
        loading,
        setSelectedCurrency,
        selectedCurrency,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}
