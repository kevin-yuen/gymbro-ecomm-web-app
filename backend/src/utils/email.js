const nodemailer = require("nodemailer");
const Token = require("../models/verificationToken");
const crypto = import("crypto");

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: 587, // based on HOST
    secure: false, // based on HOST
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  return new Promise((resolve, reject) =>
    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: text,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    )
  );
};

const createVerificationTokenAndURL = async (user) => {
  const verificationToken = await Token.create({
    userId: user._id,
    token: (await crypto).randomBytes(32).toString("hex"),
    createdAt: new Date(),
  });

  return `${process.env.BASE_URL}/users/verify/${verificationToken.userId}/${verificationToken.token}`;
};

const createEmailMessageContent = async (
  user,
  verificationTokenAndURL_CB = undefined,
  ...emailContents
) => {
  let tempFinalEmailContent = "";
  for (const emailContent of emailContents)
    tempFinalEmailContent += emailContent;

  if (verificationTokenAndURL_CB !== undefined) {
    try {
      const verificationTokenAndURL = await verificationTokenAndURL_CB(user);

      return tempFinalEmailContent + verificationTokenAndURL;
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    return tempFinalEmailContent;
  }
};

module.exports = {
  sendEmail,
  createVerificationTokenAndURL,
  createEmailMessageContent,
};
