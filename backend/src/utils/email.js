const nodemailer = require("nodemailer");

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

  return new Promise((resolve, reject) => transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      html: text,
    },
    (error, info) => {
        if (error) {
            reject(error)
        }
        else {
            resolve(info)
        }
    }
  )) 
};

module.exports = sendEmail;
