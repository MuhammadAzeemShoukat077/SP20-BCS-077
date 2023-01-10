const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/getbyid/:id", userController.getUserById);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.put("/update/:id", userController.updateUser);

router.get("/connection", () => {
  console.log("hello!");
});

module.exports = router;
