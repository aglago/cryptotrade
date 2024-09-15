import PropTypes from "prop-types";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const TradingTable = ({ trades, darkMode }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-center border-separate border-spacing-y-4 sm:border-spacing-y-6">
      <thead className="hidden sm:table-header-group">
        <tr className="text-gray-400">
          <th className="py-2 px-2 sm:px-4">#</th>
          <th className="py-2 px-2 sm:px-4">Platform</th>
          <th className="py-2 px-2 sm:px-4">Last Traded Price</th>
          <th className="py-2 px-2 sm:px-4">Buy / Sell Price</th>
          <th className="py-2 px-2 sm:px-4">Difference</th>
          <th className="py-2 px-2 sm:px-4">Savings</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade, index) => (
          <tr
            key={index}
            className={`${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            } flex flex-col sm:table-row mb-4 sm:mb-0`}
          >
            <td className="py-2 sm:py-4 px-2 sm:px-4 flex justify-between sm:table-cell">
              <span className="sm:hidden font-bold">#</span>
              <span className={`${darkMode ? "text-white" : "text-black"}`}>
                {index + 1}
              </span>
            </td>
            <td className="py-2 sm:py-4 px-2 sm:px-4 flex justify-between items-center sm:table-cell">
              <span className="sm:hidden font-bold">Platform</span>
              <div className="flex items-center justify-center">
                <span className="w-4 h-4 sm:w-6 sm:h-6 mr-2 bg-gray-600 rounded-full"></span>
                <span className={`${darkMode ? "text-white" : "text-black"}`}>
                  {trade.platform}
                </span>
              </div>
            </td>
            <td className="py-2 sm:py-4 px-2 sm:px-4 flex justify-between sm:table-cell">
              <span className="sm:hidden font-bold">Last Traded Price</span>
              <span className={`${darkMode ? "text-white" : "text-black"}`}>
                ₹ {trade.lastPrice.toLocaleString()}
              </span>
            </td>
            <td className="py-2 sm:py-4 px-2 sm:px-4 flex justify-between sm:table-cell">
              <span className="sm:hidden font-bold">Buy / Sell Price</span>
              <span className={`${darkMode ? "text-white" : "text-black"}`}>
                ₹ {trade.buyPrice.toLocaleString()} / ₹{" "}
                {trade.sellPrice.toLocaleString()}
              </span>
            </td>
            <td
              className={`py-2 sm:py-4 px-2 sm:px-4 flex justify-between sm:table-cell ${
                trade.difference > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              <span className="sm:hidden font-bold">Difference</span>
              <span>
                {trade.difference > 0 ? (
                  <ArrowUpRight size={16} className="inline" />
                ) : (
                  <ArrowDownRight size={16} className="inline" />
                )}
                {Math.abs(trade.difference)}%
              </span>
            </td>
            <td
              className={`py-2 sm:py-4 px-2 sm:px-4 flex justify-between sm:table-cell ${
                trade.savings > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              <span className="sm:hidden font-bold">Savings</span>
              <span>
                {trade.savings > 0 ? "▲" : "▼"} ₹{" "}
                {Math.abs(trade.savings).toLocaleString()}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TradingTable.propTypes = {
  trades: PropTypes.arrayOf(
    PropTypes.shape({
      platform: PropTypes.string.isRequired,
      lastPrice: PropTypes.number.isRequired,
      buyPrice: PropTypes.number.isRequired,
      sellPrice: PropTypes.number.isRequired,
      difference: PropTypes.number.isRequired,
      savings: PropTypes.number.isRequired,
    })
  ).isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default TradingTable;
