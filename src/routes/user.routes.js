const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  allUsers,
  deleteUser,
  findUser,
  updateUser,
  createUser,
} = require("../controllers/user.controller");

router.get("/allusers", allUsers);
router.get("/showuser/:id", findUser);
router.put("/update/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.post("/create", createUser);

// router.get("/allusers", auth, allUsers);
// router.get("/showuser/:id", auth, findUser);
// router.put("/update/:id", auth, updateUser);
// router.delete("/deleteUser/:id", auth, deleteUser);
// router.post("/create", auth, createUser);

module.exports = router;
