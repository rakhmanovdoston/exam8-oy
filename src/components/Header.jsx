import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../store/CryptoContext";
import { Link } from "react-router-dom";
import { Drawer } from "flowbite-react";

export default function Header() {
  const { setSelectedCurrency, dispatch, selectedCryptos, selectedCurrency } =
    useContext(CryptoContext);

  const handleCurrencyChange = (e) => {
    dispatch(setSelectedCurrency(e.target.value));
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const getCurrencySymbol = () => {
    switch (selectedCurrency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "AED":
        return "د.إ";
      default:
        return "";
    }
  };

  return (
    <header className="w-full h-[64px]">
      <div className="w-[1280px] h-full flex justify-between m-auto items-center">
        <h1 className="montserrat text-[20px] font-bold hover:font-light transition-all text-[#87CEEB]">
          <Link to={"/"}>CRYPTOFOLIO</Link>
        </h1>
        <nav className="flex gap-5 items-center">
          <select
            name="currency"
            id="currency"
            className={`w-[85px] h-[40px] bg-[#14161A] text-white border-none outline-none cursor-pointer `}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="AED">AED</option>
            <option value="EUR">EUR</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className="roboto w-[133px] h-[40px] rounded-[4px] bg-[#87CEEB] font-normal text-[14px] items-center text-[#000000] "
          >
            WATCH LIST
          </button>
        </nav>
      </div>
      <Drawer
        className="w-[511px] bg-[#515151] px-10"
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <Drawer.Items>
          <h1 className="text-center roboto font-medium text-[30px] text-white">
            WATCH LIST
          </h1>
          <section className="grid grid-cols-2 gap-4">
            {selectedCryptos &&
              selectedCryptos.map((s) => {
                return (
                  <div
                    key={s.id}
                    className="w-[200px] h-[250px] bg-[#14161A] rounded-[25px] p-5 flex flex-col gap-5 items-center col-span-1"
                  >
                    <img src={s.image} alt={s.name} width={118} height={118} />
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-white">
                        {getCurrencySymbol()} {s.currentPrice.toLocaleString()}
                      </p>
                      <button className="w-[100px] h-[30px] bg-red-600 text-white">
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
          </section>
        </Drawer.Items>
      </Drawer>
    </header>
  );
}
