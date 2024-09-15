import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [tickers, setTickers] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch(
          "https://cryptotrade-1gi2.onrender.com/api/tickers"
        );
        const data = await response.json();
        setTickers(data);

        if (data.length > 0 && !selectedCoin) {
          setSelectedCoin(data[0].base_unit.toUpperCase());
        }
      } catch (error) {
        console.error("Error fetching tickers:", error);
      }
    };

    fetchTickers();
    const interval = setInterval(fetchTickers, 60000);

    return () => clearInterval(interval);
  }, [selectedCoin]);

  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <Layout
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          tickers={tickers}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to={`/${selectedCoin}-${selectedCurrency}`} replace />
              }
            />
            <Route
              path="/:pair"
              element={
                <Dashboard
                  selectedCoin={selectedCoin}
                  selectedCurrency={selectedCurrency}
                  tickers={tickers}
                  darkMode={darkMode}
                />
              }
            />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;