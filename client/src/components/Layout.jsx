import PropTypes from "prop-types";
import Header from "./Header";

const Layout = ({
  children,
  selectedCoin,
  setSelectedCoin,
  selectedCurrency,
  setSelectedCurrency,
  tickers,
  darkMode,
  setDarkMode
}) => {
  return (
    <div className={`${darkMode? "bg-gray-900" : ""} min-h-screen`}>
      <Header
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        tickers={tickers}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  selectedCoin: PropTypes.string.isRequired,
  setSelectedCoin: PropTypes.func.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  setSelectedCurrency: PropTypes.func.isRequired,
  tickers: PropTypes.arrayOf(
    PropTypes.shape({
      base_unit: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
      buy: PropTypes.string.isRequired,
      sell: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired
};

export default Layout;
