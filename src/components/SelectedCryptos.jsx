import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../store/CryptoContext";
import LineChart from "./LineChart";

function SelectedCryptos() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState({});

  const { selectedCurrency } = useContext(CryptoContext);

  const [selectedButton, setSelectedButton] = useState("24 Hours");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch crypto data");
        }
        const data = await response.json();
        setCrypto(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountry();
  }, [id]);

  console.log(crypto);

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

  const handleButtonClick = (buttonText) => {
    setSelectedButton(buttonText);
  };

  return (
    <main className="w-full flex gap-10 items-center">
      <aside className="w-[447px] h-[747px] border-r-2 border-r-gray-500 pl-2 text-white mt-10 ml-3">
        {crypto.image && (
          <img
            src={crypto.image.large}
            alt={crypto.name}
            width={200}
            height={200}
            className="m-auto"
          />
        )}
        <h2 className="montsrt font-bold text-[48px] text-center">
          {crypto.name}
        </h2>
        <p className="montsrt font-normal text-[15px] my-3">
          {crypto.description && (
            <span>
              {crypto.description.en.slice(0, 150)}
              {crypto.description.en.length > 150 && "..."}
            </span>
          )}
        </p>
        <article className="flex gap-2">
          <span className="montsrt font-bold text-[24px]">Rank:</span>{" "}
          <p className="montsrt font-normal text-[24px]">
            {crypto.market_cap_rank}
          </p>
        </article>
        <article className="flex gap-2">
          <span className="montsrt font-bold text-[24px]">Current Price:</span>{" "}
          <p className="montsrt font-normal text-[24px]">
            {" "}
            {getCurrencySymbol()}{" "}
            {crypto.market_data &&
              crypto.market_data.current_price[
                selectedCurrency.toLowerCase()
              ].toLocaleString()}
          </p>
        </article>
        <article className="flex gap-2">
          <span className="montsrt font-bold text-[24px]">Market Cap:</span>{" "}
          <p className="montsrt font-normal text-[24px]">
            {" "}
            {getCurrencySymbol()}{" "}
            {crypto.market_data &&
              crypto.market_data.market_cap[
                selectedCurrency.toLowerCase()
              ].toLocaleString()}
          </p>
        </article>
      </aside>
      <section className=" pl-10">
        <LineChart />
        <div className="flex justify-around text-white gap-5 mt-5">
          <button
            className={`w-[200px] h-[40px] ${
              selectedButton === "24 Hours" ? "bg-[#87CEEB]" : "bg-transparent"
            } hover:bg-[#87CEEB] border-2 border-[#87CEEB] text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleButtonClick("24 Hours")}
          >
            24 Hours
          </button>
          <button
            className={`w-[200px] h-[40px] ${
              selectedButton === "30 Days" ? "bg-[#87CEEB]" : "bg-transparent"
            } hover:bg-[#87CEEB] border-2 border-[#87CEEB] text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleButtonClick("30 Days")}
          >
            30 Days
          </button>
          <button
            className={`w-[200px] h-[40px] ${
              selectedButton === "3 Months" ? "bg-[#87CEEB]" : "bg-transparent"
            } hover:bg-[#87CEEB] border-2 border-[#87CEEB] text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleButtonClick("3 Months")}
          >
            3 Months
          </button>
          <button
            className={`w-[200px] h-[40px] ${
              selectedButton === "1 Year" ? "bg-[#87CEEB]" : "bg-transparent"
            } hover:bg-[#87CEEB] border-2 border-[#87CEEB] text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleButtonClick("1 Year")}
          >
            1 Year
          </button>
        </div>
      </section>
    </main>
  );
}

export default SelectedCryptos;
