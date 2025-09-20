const express = require("express");
const {
  allUsers,
  deleteUser,
  findUser,
  updateUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/allusers", allUsers);
router.delete("/deleteUser/:id", deleteUser);
router.get("/showuser/:id", findUser);
router.put("/update/:id", updateUser);

module.exports = router;
