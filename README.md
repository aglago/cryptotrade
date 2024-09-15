# Cryptocurrency Trading Dashboard (MERN Stack)

## Project Description

This Cryptocurrency Trading Dashboard is a full-stack web application built on the MERN (MongoDB, Express.js, React, Node.js) stack. It provides real-time cryptocurrency trading information, with a robust backend architecture designed to handle data processing, API integrations, and database management.

### Key Features:

- **Real-time Data Processing**: Backend service fetches and processes cryptocurrency data from external APIs every minute.
- **RESTful API**: Custom-built API endpoints for serving processed data to the frontend.
- **Database Integration**: MongoDB for efficient storage and retrieval of historical cryptocurrency data.
- **Data Aggregation**: Backend logic to calculate and serve aggregated statistics (e.g., price changes over various time periods).
- **Scalable Architecture**: Designed with scalability in mind to handle increasing data loads and user requests.
- **Error Handling & Logging**: Comprehensive error handling and logging system for monitoring and debugging.
- **Authentication & Authorization**: Secure user authentication system (if applicable).
- **Frontend Integration**: React-based frontend for data visualization and user interaction.

### Technology Stack:

#### Backend:
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing cryptocurrency data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **Axios**: Promise-based HTTP client for making API requests
- **Node-cron**: Task scheduler for periodic data fetching
- **Cors**: Middleware for enabling CORS with various options

#### Frontend:
- React
- React Router for navigation
- Axios for API calls to the backend

#### DevOps & Tools:
- Git for version control
- npm for package management
- dotenv for environment variable management

## Backend Architecture

The backend is structured around several key components:

1. **API Routes**: Defined in Express.js, handling requests for cryptocurrency data.
2. **Data Fetching Service**: Scheduled task using node-cron to fetch latest cryptocurrency data.
3. **Data Processing Layer**: Services to process and aggregate raw data.
4. **Database Layer**: MongoDB schemas and models for data persistence.
5. **Error Handling Middleware**: Custom error handling for robust API responses.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository
   ```
   git clone https://github.com/aglago/cryptotrade.git
   ```
2. Install NPM packages for backend
   ```
   cd backend
   npm install
   ```
3. Set up environment variables
   Create a `.env` file in the backend directory and add necessary variables (e.g., MongoDB URI)

4. Start the backend server
   ```
   npm run server
   ```
5. In a new terminal, set up and start the frontend
   ```
   cd ../frontend
   npm install
   npm run dev
   ```

## Contributing

Contributions are welcome, especially those that enhance the backend functionality or improve scalability and performance.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingBackendFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingBackendFeature'`)
4. Push to the Branch (`git push origin feature/AmazingBackendFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@smaglago](https://twitter.com/smaglago) - samuellamanyeaglago@gmail.com

Project Link: [Dashboard](https://cryptotrade-phi.vercel.app/)