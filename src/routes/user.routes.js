const express = require("express");
const {
  allUsers,
  deleteUser,
  findUser,
  updateUser,
  createUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/allusers", allUsers);
router.delete("/deleteUser/:id", deleteUser);
router.get("/showuser/:id", findUser);
router.put("/update/:id", updateUser);
router.post("/create", createUser);

module.exports = router;
