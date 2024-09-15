import PropTypes from "prop-types"; // Import PropTypes
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PriceStats from "./PriceStats";
import TradingTable from "./TradingTable";

const Dashboard = ({ selectedCoin, selectedCurrency, darkMode }) => {
  const [tickers, setTickers] = useState([]);
  const { pair } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const [pairCoin, pairCurrency] = pair.split("-");
    if (pairCoin !== selectedCoin || pairCurrency !== selectedCurrency) {
      navigate(`/${selectedCoin}-${selectedCurrency}`, { replace: true });
    }
  }, [pair, selectedCoin, selectedCurrency, navigate]);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tickers");
        const data = await response.json();
        setTickers(data);
      } catch (error) {
        console.error("Error fetching tickers:", error);
      }
    };

    fetchTickers();
    const interval = setInterval(fetchTickers, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, []);

  const calculateStats = () => {
    if (tickers.length === 0) return [[], "0"];

    const selectedTicker = tickers.find(
      (ticker) => ticker.base_unit.toLowerCase() === selectedCoin.toLowerCase()
    );
    if (!selectedTicker) return [[], "0"];

    const currentPrice = parseFloat(selectedTicker.last);
    const stats = [
      {
        label: "5 Mins",
        value: `${(
          (currentPrice / parseFloat(selectedTicker.last) - 1) *
          100
        ).toFixed(2)}%`,
      },
      {
        label: "1 Hour",
        value: `${(
          (currentPrice / parseFloat(selectedTicker.last) - 1) *
          100
        ).toFixed(2)}%`,
      },
      {
        label: "1 Day",
        value: `${(
          (currentPrice / parseFloat(selectedTicker.last) - 1) *
          100
        ).toFixed(2)}%`,
      },
      {
        label: "7 Days",
        value: `${(
          (currentPrice / parseFloat(selectedTicker.last) - 1) *
          100
        ).toFixed(2)}%`,
      },
    ];

    return [stats, (+currentPrice.toFixed(2)).toLocaleString()];
  };

  const formatTrades = () => {
    return tickers.map((ticker) => {
      const buyPrice = parseFloat(ticker.buy);
      const sellPrice = parseFloat(ticker.sell);
      const lastPrice = parseFloat(ticker.last);

      const difference =
        buyPrice !== 0
          ? (((sellPrice - buyPrice) / buyPrice) * 100).toFixed(2)
          : "0";
      const savings = (sellPrice - buyPrice).toFixed(2);

      return {
        platform: ticker.name,
        lastPrice,
        buyPrice,
        sellPrice,
        difference,
        savings: !isNaN(savings) ? savings : "0",
      };
    });
  };

  const stats = calculateStats();

  return (
    <div className={`text-white min-h-screen`}>
      <main className="container mx-auto px-4">
        <PriceStats
          stats={stats}
          selectedCoin={selectedCoin}
          selectedCurrency={selectedCurrency}
          darkMode={darkMode}
        />
        <TradingTable
          trades={formatTrades()}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  selectedCoin: PropTypes.string.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Dashboard;
