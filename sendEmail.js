const nodemailer = require("nodemailer")

function translateSubject(subject=subject) {
  if (subject === "1") {
    return "refund"
  } else if (subject === "2") {
    return "shipping"
  } else {
    return "other"
  }
}

const sendEmail = async function (FirstName, LastName, email, subject, message) {
  return new Promise((resolve, reject) => {
    const transporterOptions = {
      service: "outlook",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILSECRET,
      }
    }
    const transporter = nodemailer.createTransport(transporterOptions)
    const sendOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `${FirstName} ${LastName} need help with ${subject}`,
      text: `${message} FROM ${email}`
    };


    transporter.sendMail(sendOptions, function (error, info) {
      if (error) {
        console.log("error is ", error);
        resolve(false); // or use rejcet(false) but then you will have to handle errors
      }
      else {
        console.log("Email sent:", info);
        resolve(true);
      }
    });
  })
}

module.exports = {translateSubject, sendEmail}

