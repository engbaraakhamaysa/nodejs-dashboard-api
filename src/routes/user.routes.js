const express = require("express");
const allUsers = require("../controllers/user.controller");

const router = express.Router();

router.get("/allusers", allUsers);

module.exports = router;
