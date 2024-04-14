const User = require("../models/user");
const Token = require("../models/verificationToken");
const crypto = import("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/email");
const emailContent = require("../config/email-content.json");

const createEmailMessageContent = async (user) => {
  const verificationToken = await Token.create({
    userId: user._id,
    token: (await crypto).randomBytes(32).toString("hex"),
    createdAt: new Date(),
  });

  const verificationURL = `${process.env.BASE_URL}/users/verify/${verificationToken.userId}/${verificationToken.token}`;
  const message = emailContent.content + verificationURL;

  return message;
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isEmailInUse = await User.findOne({ email });

    if (isEmailInUse) {
      return res.status(400).json({ error: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const message = await createEmailMessageContent(newUser); // create verification token and message content

    const receiverResponse = await sendEmail(
      newUser.email,
      emailContent.subject,
      message
    );

    if (receiverResponse.response.includes("250")) {
      // 250 = smtp status OK
      res.status(201).json({ message: "Email sent successfully", newUser });
    } else {
      res.status(502).json({ error });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const verifyToken = async (req, res) => {
  const { id, token } = req.params;
  const dateRequestSent = new Date(); // dateTime when user verifies his email address

  try {
    const isUserExist = await User.findOne({ _id: id });
    if (!isUserExist) {
        return res.redirect(`${process.env.REDIRECT_BASE_URL}/invalid-verification-link/${id}`);
    }

    const isTokenMatch = await Token.findOne({ token });
    if (!isTokenMatch) {
        return res.redirect(`${process.env.REDIRECT_BASE_URL}/invalid-verification-link/${id}`);
    } else {
      const tokenCreateDtAndVerifyDtDiff =
        dateRequestSent.getDate() - isTokenMatch.createdAt.getDate();

      if (tokenCreateDtAndVerifyDtDiff <= 3) {
        const verifyStatus = await User.updateOne(
          { _id: id },
          { $set: { verified: true } }
        );

        if (verifyStatus.acknowledged === true) {
          return res.redirect(
            `${process.env.REDIRECT_BASE_URL}/email-verified`
          );
        } else {
          return res
            .status(400)
            .json({ error: "Verify status updated failed" });
        }
      } else {
        await Token.deleteOne({ token });
        return res.redirect(
          `${process.env.REDIRECT_BASE_URL}/expired-verification-link/${id}`
        );
      }
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const resendToken = async (req, res) => {
  try {
    let isUserExist = await User.findOne({ _id: req.body.id });
    if (!isUserExist) {
       isUserExist = await User.findOne({ email: req.body.email });

       if (!isUserExist) return res.status(404).json({ error: "User not exist" });
    }
    const isTokenExist = await Token.findOne({ userId: isUserExist._id });
    if (isTokenExist) await Token.deleteOne({ userId: isUserExist._id });

    const message = await createEmailMessageContent(isUserExist);   // create verification token and message content

    const receiverResponse = await sendEmail(
      isUserExist.email,
      emailContent.subject,
      message
    );

    if (receiverResponse.response.includes("250")) {
      // 250 = smtp status OK
      res.status(201).json({ message: "Email sent successfully", isUserExist });
    } else {
      res.status(502).json({ error });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isEmailExist = await User.findOne({ email });

    if (!isEmailExist) {
      return res.status(404).json({ error: "Email not exist!" });
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { createUser, signInUser, verifyToken, resendToken };
