import PropTypes from "prop-types";

const PriceStats = ({ stats, selectedCoin, selectedCurrency }) => {
  // Safeguard against undefined stats
  if (!stats || !Array.isArray(stats) || stats.length < 2) {
    return <div>Loading...</div>;
  }

  const [statItems, currentPrice] = stats;

  // Safeguard against undefined statItems
  if (!Array.isArray(statItems)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-4 mx-auto">
      <h2 className="text-lg text-gray-500 font-semibold mb-2 text-center">
        Best Price to Trade
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center mb-2">
        <div className="flex flex-wrap md:gap-6 justify-between w-full sm:w-auto">
          {statItems.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="text-center w-1/2 sm:w-auto mb-2 sm:mb-0"
            >
              <div className="text-2xl sm:text-2xl font-bold text-teal-400">
                {item.value}
              </div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center w-full sm:w-2/4 my-4">
          <div className="text-4xl lg:text-6xl md:text-5xl font-bold">
            ₹{" "}
            {typeof currentPrice === "number"
              ? currentPrice.toLocaleString()
              : currentPrice}
          </div>
        </div>
        <div className="flex flex-wrap md:gap-6 justify-between w-full sm:w-auto">
          {statItems.slice(2).map((item, index) => (
            <div
              key={index}
              className="text-center w-1/2 sm:w-auto mt-2 sm:mt-0"
            >
              <div className="text-2xl sm:text-2xl font-bold text-teal-400">
                {item.value}
              </div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-gray-500 mt-1 text-center text-xs sm:text-sm">
        Average {selectedCoin}/{selectedCurrency} net price including commission
      </p>
    </div>
  );
};

PriceStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ])
  ),
  selectedCoin: PropTypes.string.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};

export default PriceStats;
