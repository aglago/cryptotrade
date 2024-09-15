import PropTypes from "prop-types";
import { Moon, Send, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({
  selectedCoin,
  setSelectedCoin,
  selectedCurrency,
  setSelectedCurrency,
  tickers,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCoinChange = (event) => {
    const newCoin = event.target.value;
    setSelectedCoin(newCoin);
    navigate(`/${newCoin}-${selectedCurrency}`);
  };

  const handleCurrencyChange = (event) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);
    navigate(`/${selectedCoin}-${newCurrency}`);
  };

  return (
    <header className="flex flex-col gap-3 md:flex-row justify-between items-center p-4 text-teal-300 px-4 md:px-12">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-widest mb-4 md:mb-0">
        HODLINFO
      </h1>
      <div className="flex space-x-2 md:space-x-4 w-full md:w-auto">
        <select
          className="bg-gray-700 text-white p-2 rounded-lg text-sm md:text-base flex-grow md:flex-grow-0"
          onChange={handleCurrencyChange}
          value={selectedCurrency}
        >
          <option value="INR">INR</option>
        </select>
        <select
          className="bg-gray-700 text-white p-2 rounded-lg text-sm md:text-base flex-grow md:flex-grow-0"
          onChange={handleCoinChange}
          value={selectedCoin}
        >
          {tickers.map((ticker) => (
            <option
              key={ticker.base_unit}
              value={ticker.base_unit.toUpperCase()}
            >
              {ticker.base_unit.toUpperCase()}
            </option>
          ))}
        </select>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm md:text-base flex-grow md:flex-grow-0">
          BUY {selectedCoin}
        </button>
      </div>
      <div className="flex justify-between md:justify-start items-center space-x-4 w-full md:w-auto">
        <div className="border-4 border-teal-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-sm md:text-base">
          {timer}
        </div>
        <button className="bg-teal-500 text-white px-4 py-2 rounded-xl flex items-center text-sm md:text-base">
          <Send size={16} className="mr-2" /> Connect Telegram
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-gray-700 p-2 rounded-full"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  selectedCoin: PropTypes.string.isRequired,
  setSelectedCoin: PropTypes.func.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  setSelectedCurrency: PropTypes.func.isRequired,
  tickers: PropTypes.arrayOf(
    PropTypes.shape({
      base_unit: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Header;
