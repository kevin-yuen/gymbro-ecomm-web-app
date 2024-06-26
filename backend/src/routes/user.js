const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyToken,
  signInUser,
  resendToken,
  sendTempPassword,
  resetPassword
} = require("../controllers/user");

router.post("/signUp", createUser);
router.post("/signIn", signInUser);
router.get("/verify/:id/:token", verifyToken);
router.post("/resendVerificationLink", resendToken);
router.post("/sendTemporaryPassword", sendTempPassword);
router.post("/resetPassword", resetPassword);

module.exports = router;
