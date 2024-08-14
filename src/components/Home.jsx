import { Carousel, Pagination } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../store/CryptoContext";
import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export default function Home() {
  const cryptoContext = useContext(CryptoContext);
  const {
    selectedCryptos,
    cryptos,
    dispatch,
    error,
    loading,
    setError,
    setLoading,
    addCryptos,
    selectedCurrency,
  } = cryptoContext;

  const [currentPage, setCurrentPage] = useState(1);
  const cryptosPerPage = 10;

  const [searchQuery, setSearchQuery] = useState("");

  console.log(selectedCurrency);

  useEffect(() => {
    async function fetchAllCryptos() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}&order=gecko_desc&per_page=1000&page=1&sparkline=false&price_change_percentage=24h`
        );
        if (!response.ok) {
          setError("Network was not ok");
        }
        const data = await response.json();
        dispatch(addCryptos(data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAllCryptos();
  }, [selectedCurrency]);

  const customTheme = {
    root: {
      base: "relative h-full w-full",
      leftControl:
        "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-white dark:bg-gray-800",
      },
      base: "h-3 w-3 rounded-full",
      wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
    },
    item: {
      base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      wrapper: {
        off: "w-full flex-shrink-0 transform cursor-default snap-center",
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
      },
    },
    control: {
      base: "",
      icon: "hidden",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
      snap: "snap-x",
    },
  };

  const paginationCustomTheme = {
    base: "text-[#87CEEB]",
    layout: {
      table: {
        base: "text-sm text-gray-700 dark:text-gray-400",
        span: "font-semibold text-[#87CEEB] dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center text-[#87CEEB] -space-x-px bg-transparent",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg  bg-transparent px-3 py-2 leading-tight text-[#87CEEB] enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg bg-transparent px-3 py-2 leading-tight text-[#87CEEB]  enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 h-12 bg-transparent py-2 leading-tight text-[#87CEEB] enabled:hover:text-[#87CEEB] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white rounded-full",
        active:
          " text-[#87CEEB] bg-gray-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };

  const paginateCryptos = () => {
    const filteredCryptos = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const startIndex = (currentPage - 1) * cryptosPerPage;
    const endIndex = startIndex + cryptosPerPage;
    return filteredCryptos.slice(startIndex, endIndex);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

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
    <main>
      <section className="main w-full h-[400px] p-10 flex flex-col gap-5">
        <article className="flex flex-col">
          <h1 className="font-bold text-[60px] text-center text-[#87CEEB] ">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="text-center font-normal text-[14px] text-[#A9A9A9]">
            Get all the Info regarding your favorite Crypto Currency
          </p>
        </article>
        <Carousel
          className={`w-full my-5 h-[188px] m-auto bg-transparent text-white`}
          theme={customTheme}
          indicators={false}
        ></Carousel>
      </section>
      <section className="w-full h-auto sm:w-[1280px] pb m-auto mt-10">
        <h1 className="montsrt text-[34px] text-center text-white font-light">
          Cryptocurrency Prices by Market Cap
        </h1>
        <input
          type="search"
          placeholder="Search countries..."
          className="w-full h-[61px] bg-transparent roboto font-normal text-[16px] px-5 rounded-md text-white my-5"
          value={searchQuery}
          onChange={handleSearch}
        />
        <table className="w-full sm:w-[1280px] m-auto min-h-screen bg-transparent ">
          <thead className="rounded-md">
            <tr className="bg-[#87CEEB] text-black">
              <th className="w-[445px] text-start py-2 px-4 border-b">Coin</th>
              <th className="w-[263px] text-end py-2 px-4 border-b">Price</th>
              <th className="w-[250px] text-end py-2 px-4 border-b">
                24h Change
              </th>
              <th className="py-2 px-4 border-b w-[263px] text-end">
                Market Cap
              </th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody className="border-b-2 border-b-[#515151]">
            {paginateCryptos().map((crypto, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b-2 border-b-[#515151] text-white items-center">
                  <div className="flex items-center gap-5">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      width={50}
                      height={50}
                    />
                    <article className="text-start">
                      <Link to={`/selectedCountry/${crypto.id}`}>
                        <p className="roboto font-normal text-[22px]">
                          {crypto.symbol.toUpperCase()}
                        </p>
                      </Link>
                      <span className="roboto font-normal text-[14px] text-[#A9A9A9]">
                        {crypto.name}
                      </span>
                    </article>
                  </div>
                </td>
                <td className="py-2 px-4 border-b-2 border-b-[#515151] text-white text-end">
                  <span className="roboto font-normal text-[14px]">
                    {getCurrencySymbol()}{" "}
                    {crypto.current_price.toLocaleString()}
                  </span>
                </td>
                <td className={`py-2 px-4 border-b-2 border-b-[#515151]`}>
                  <div className=" flex gap-5 items-center pl-[130px]">
                    <button>
                      {" "}
                      <MdRemoveRedEye className="text-white" />
                    </button>
                    <span
                      className={`${
                        crypto.price_change_percentage_24h > 0
                          ? "text-[#0ECB81]"
                          : "text-red-500"
                      }`}
                    >
                      {crypto.price_change_percentage_24h > 0 ? "+" : ""}
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b-2 border-b-[#515151] text-white text-end">
                  {crypto.market_cap.toLocaleString()}M
                </td>
                <td className="py-2 px-4 border-b-2 border-b-[#515151] text-white"></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={Math.ceil(cryptos.length / cryptosPerPage)}
          theme={paginationCustomTheme}
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          className="ml-[500px] py-5"
        />
      </section>
    </main>
  );
}
