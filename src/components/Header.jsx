import React, { useContext, useState } from "react";
import { CryptoContext } from "../store/CryptoContext";

export default function Header() {
  const { selectedCurrency, setSelectedCurrency, dispatch } =
    useContext(CryptoContext);

  const handleCurrencyChange = (e) => {
    dispatch(setSelectedCurrency(e.target.value));
  };

  return (
    <header className="w-full h-[64px]">
      <div className="w-[1280px] h-full flex justify-between m-auto items-center">
        <h1 className="montserrat text-[20px] font-bold text-[#87CEEB]">
          CRYPTOFOLIO
        </h1>
        <nav className="flex gap-5 items-center">
          <select
            name="currency"
            id="currency"
            className="w-[85px] h-[40px] bg-[#14161A] text-white border-none outline-none"
            onChange={handleCurrencyChange}
          >
            <option className="bg-transparent" value="USD">
              USD
            </option>
            <option value="AED">AED</option>
            <option value="EUR">EUR</option>
          </select>
          <button className="roboto w-[133px] h-[40px] rounded-[4px] bg-[#87CEEB] font-normal text-[14px] items-center text-[#000000] ">
            WATCH LIST
          </button>
        </nav>
      </div>
    </header>
  );
}
