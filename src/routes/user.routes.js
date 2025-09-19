const express = require("express");
const { allUsers, deleteUser } = require("../controllers/user.controller");

const router = express.Router();

router.get("/allusers", allUsers);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
