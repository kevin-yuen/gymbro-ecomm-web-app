const User = require("../models/user");
const Token = require("../models/verificationToken");
const crypto = import("crypto");
const bcrypt = require("bcrypt");
const {
  sendEmail,
  createEmailMessageContent,
  createVerificationTokenAndURL,
} = require("../utils/email");
const emailContent = require("../config/email-content.json");
const ObjectId = require("mongoose").Types.ObjectId;

const emailVerificationContent = emailContent["email-verification"].content;
const pwdResetContentOne = emailContent["password-reset"]["content-one"];
const pwdResetContentTwo = emailContent["password-reset"]["content-two"];
const pwdResetSignature = emailContent["password-reset"].signature;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const isEmailInUse = await User.findOne({ email });
    if (isEmailInUse)
      return res.status(400).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // create verification token and message content
    const message = await createEmailMessageContent(
      newUser,
      createVerificationTokenAndURL,
      emailVerificationContent
    );

    const receiverResponse = await sendEmail(
      newUser.email,
      emailContent["email-verification"].subject,
      message
    );

    if (receiverResponse.response.includes("250")) {
      // 250 = smtp status OK
      res.status(201).json({ message: "Email sent successfully", newUser });
    } else {
      res.status(502).json({ error });
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: e.message });
  }
};

const verifyToken = async (req, res) => {
  const { id, token } = req.params;
  const dateRequestSent = new Date(); // dateTime when user verifies his email address

  try {
    const isUserExist = await User.findOne({ _id: id });
    if (!isUserExist)
      return res.redirect(
        `${process.env.REDIRECT_BASE_URL}/auth/invalid_verification_link/${id}`
      );

    const isTokenMatch = await Token.findOne({ token });
    if (!isTokenMatch) {
      return res.redirect(
        `${process.env.REDIRECT_BASE_URL}/auth/invalid_verification_link/${id}`
      );
    } else {
      const tokenCreateDtAndVerifyDtDiff =
        dateRequestSent.getDate() - isTokenMatch.createdAt.getDate();

      if (tokenCreateDtAndVerifyDtDiff <= 3) {
        const { acknowledged, modifiedCount, matchedCount } =
          await User.updateOne(
            { _id: id, verified: false },
            { $set: { verified: true } }
          );

        if (acknowledged === true) {
          if (modifiedCount > 0 && matchedCount > 0) {
            return res.redirect(
              `${process.env.REDIRECT_BASE_URL}/auth/email_verified`
            );
          } else {
            return res.redirect(
              `${process.env.REDIRECT_BASE_URL}/auth/email_verified_prior`
            );
          }
        } else {
          return res
            .status(400)
            .json({ error: "Verify status updated failed" });
        }
      } else {
        await Token.deleteOne({ token });
        return res.redirect(
          `${process.env.REDIRECT_BASE_URL}/auth/expired_verification_link/${id}`
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

    if (!isUserExist) return res.status(404).json({ error: "User not exist" });

    const isTokenExist = await Token.findOne({ userId: isUserExist._id });
    if (isTokenExist) await Token.deleteOne({ userId: isUserExist._id });

    // create verification token and message content
    const message = await createEmailMessageContent(
      isUserExist,
      createVerificationTokenAndURL,
      emailVerificationContent
    );

    const receiverResponse = await sendEmail(
      isUserExist.email,
      emailContent["email-verification"].subject,
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
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) return res.status(404).json({ error: "Email not exist" });

    const isEmailVerified = await User.findOne({ email, verified: true });
    if (!isEmailVerified)
      return res.status(400).json({ error: "Email not verified" });

    const isPasswordMatch = await bcrypt.compare(
      password,
      isEmailVerified.password
    );

    if (isPasswordMatch) {
      return res.status(201).json({ message: "Password match", isUserExist });
    } else {
      return res.status(401).json({ error: "Password not match" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const sendTempPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) return res.status(404).json({ error: "Email not exist" });

    const genRandPassword = (await crypto).randomBytes(20).toString("hex");
    const hashedRandPassword = await bcrypt.hash(genRandPassword, 10);

    const verifyStatus = await User.updateOne(
      { _id: isUserExist._id },
      { $set: { password: hashedRandPassword } }
    );

    if (verifyStatus.acknowledged === true) {
      const randPassword = `<b>${genRandPassword}</b><br /><br />`;

      const pwdResetURL = `${process.env.REDIRECT_BASE_URL}/auth/resetPassword/${isUserExist._id}`;
      const emailLink = `<a href=${pwdResetURL}>Reset your password</a><br /><br />`;

      const message = await createEmailMessageContent(
        isUserExist,
        undefined,
        pwdResetContentOne,
        randPassword,
        pwdResetContentTwo,
        emailLink,
        pwdResetSignature
      );

      const receiverResponse = await sendEmail(
        isUserExist.email,
        emailContent["password-reset"].subject,
        message
      );

      if (receiverResponse.response.includes("250")) {
        // 250 = smtp status OK
        return res
          .status(201)
          .json({ message: "Email sent successfully", isUserExist });
      } else {
        return res.status(502).json({ error });
      }
    } else {
      return res.status(400).json({ error: "Verify status updated failed" });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const resetPassword = async (req, res) => {
  const { id, tempPassword, newPassword } = req.body;

  try {
    const isUserExist = await User.findOne({ _id: id });
    const isTempPasswordMatch = await bcrypt.compare(
      tempPassword,
      isUserExist.password
    );

    if (!isTempPasswordMatch)
      return res.status(401).json({ error: "Temporary password not match" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const verifyStatus = await User.updateOne(
      { _id: isUserExist.id },
      { $set: { password: hashedPassword } }
    );

    if (verifyStatus.acknowledged === true) {
      return res
        .status(201)
        .json({ message: "Password reset success", isUserExist });
    } else {
      return res.status(400).json({ error: "Verify status updated failed" });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// const findUser = async (req, res) => {
//   console.log("FINDING...");
//   console.log("FIND USER FUNCTION", req.params.userid);

//   const userid = new ObjectId(req.params.userid);

//   try {
//     const user = await User.findOne({_id: userid});

//     if (!user) return res.status(404).json({message: "User not found", userInfo: user});

//     return res.status(201).json({message: "User found", userInfo: user});
//   } catch (e) {
//     return res.status(500).json({error: e.message})
//   }
// }

module.exports = {
  createUser,
  signInUser,
  verifyToken,
  resendToken,
  sendTempPassword,
  resetPassword,
  
};
