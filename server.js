//Import library .env : He Read a Vribles inside .env & any secret settings
const dotenv = require("dotenv");
//this line Read insed file .env & Any variable contained in .env becomes available via process.env
dotenv.config();

// Import the Express app configured in app.js, which includes all routes and middleware
const app = require("./src/app");

// Start the server on the port specified in the .env file
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
