import PropTypes from "prop-types";

const CircularProgress = ({ value, max, size }) => {
  const strokeWidth = 4; // Thickness of the border
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4FD1C5" // Border color
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-20"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4FD1C5" // Border color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      <div
        className={`text-teal-300 flex items-center justify-center text-sm md:text-base ${
          size === 40 ? "w-10 h-10" : ""
        }`}
        style={{ width: size, height: size }}
      >
        {value}
      </div>
    </div>
  );
};

CircularProgress.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};


export default CircularProgress;
