/*
//-------------------------------------
// Recall important libraries and files
//-------------------------------------
--- express: The basic framework for creating servers and managing routes and middleware.
--- cors: Adds CORS support, allowing the application to respond to cross-origin requests.
--- connectDB: A function for connecting the application to a database.
--- authRoutes, user, product: Routes files for modularizing the application, each containing a specific route.
--- path: A Node.js library for handling file paths.
*/
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const product = require("./routes/product.routes");
const path = require("path");

//-------------------------------------------------------------------
// Creates the app object to which we will add Middleware and Routes.
//-------------------------------------------------------------------
const app = express();

//-------------------------------------------------------------------------
// This is where the database is connected when the application is running.
//-------------------------------------------------------------------------
connectDB();

/*
//-------------------------------------------------------------
// MIDDLEWARE(Global Middleware OR Application-level Middleware)
//-------------------------------------------------------------
--- Description:
----- app.use(cors()); => Adds CORS headers to each request → allows the application to respond to requests from different domains (cross-origin).

  Example:

  1️ Frontend and Backend on same domain and port:
     Frontend: http://localhost:3000
     Backend:  http://localhost:3000/api/product
    => CORS not needed (requests work without it)

  2️ Frontend and Backend on different ports or domains:
     Frontend: http://localhost:3000
     Backend:  http://localhost:5000/api/product
     => CORS is needed, otherwise browser blocks the request

  3️ Restricting CORS to specific origin:
     app.use(cors({
       origin: "http://localhost:3000"
     }));
     => Only allows requests from http://localhost:3000


----- app.use(express.json()); Parses the request body if it is in JSON format. Converts it to an object available via req.body.
--Note: Query and Path are accessed directly via req.query and req.params without special middleware.
*/

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

/*
//-------------------------------------------------------------
// MIDDLEWARE(Modular Middleware or Router Mounting Middleware)
//-------------------------------------------------------------
--- Description:
----- Registers a Router or middleware under a specific path prefix.
----- For Example: Any request starting with "/api/auth" will be forwarded to `authRoutes`.
----- This allows modular organization of routes (e.g., authentication routes).
*/
app.use("/api/user", user);
app.use("/api/auth", authRoutes);
app.use("/api/product", product);

/*
//--------------------------------------------
// Global Route
//--------------------------------------------
--- Description:
----- A Global Route is a route defined directly on the main Express application (`app`)
----- without being attached to any Router or path prefix. 
----- It is accessible globally across the application at the specified path.
*/

app.get("/", (req, res) => {
  res.send("Hello From API Root");
});

module.exports = app;
