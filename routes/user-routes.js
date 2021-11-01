const express = require("express");
const {
  signUp,
  signIn,
  generateToken,
  signOut,
  updateUser,
  getUsersWithCondition,
} = require("../controllers/userController");
const { isAuthorized } = require("../auth/authorized");
const router = express.Router();

router.post("/signIn", signIn);

router.post("/signUp", signUp);

router.post("/signOut", signOut);
router.post("/updateUser", updateUser);
router.post("/getUsersWithCondition", getUsersWithCondition);

module.exports = {
  routes: router,
};
