const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const product = require("./routes/product.routes");
const path = require("path");

const app = express();

connectDB();

/*
//-------------------------------------------------------------
// MIDDLEWARE(Global Middleware OR Application-level Middleware)
//-------------------------------------------------------------
--- Description:
----- app.use(cors()); => Adds CORS headers to each request → allows the application to respond to requests from different domains (cross-origin).
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
