const express = require("express");
const router = express.Router();
const {createUser, verifyToken, signInUser, resendToken} = require("../controllers/user");

router.post("/sign-up", createUser);
router.post("/sign-in", signInUser);
router.get("/verify/:id/:token", verifyToken);
router.post("/resend-verification-link", resendToken);

module.exports = router;