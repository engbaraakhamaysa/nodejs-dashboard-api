const express = require("express");
const {
  allUsers,
  deleteUser,
  findUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/allusers", allUsers);
router.delete("/deleteUser/:id", deleteUser);
router.get("/showuser/:id", findUser);

module.exports = router;
