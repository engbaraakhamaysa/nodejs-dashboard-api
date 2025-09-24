const express = require("express");
const {
  signup,
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");

const router = express.Router();

/*
//--------------------------------------------
// Route Handler (Endpoint)
//--------------------------------------------
--- Description:
----- Route Handler inside Router used to handle requests on a specific path (Endpoint). 
      It can be simple or contain middleware before the handler.
--- Syntax:
[1]---- router.METHOD(path, handlerFunction)

        router.post("/signup", (req, res) => {
            res.send("Handled here");
        });

[2]---- router.METHOD(path, [middleware...], handler)
--- Example:
---- router.post("/signup", signup); // signup is both the Handler for Express and the Controller function
*/

router.post("/signup", signup);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.post("/logout", logout);

module.exports = router;
