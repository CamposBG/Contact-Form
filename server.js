const express = require("express");
require("dotenv").config();
const { translateSubject, sendEmail } = require("./sendEmail.js")
const { body, validationResult } = require('express-validator');

const app = express()

const port = process.env.PORT || 3000;

//middleware 
app.use(express.static("public"))
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true }))

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html")
})

app.post(
  "/",
  body("email").isEmail().normalizeEmail(),
  body("message").escape().isLength({ max: 500 }),
  body("firstName").escape().isLength({ max: 25 }),
  body("lastName").escape().isLength({ max: 25 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { firstName, lastName, email, subject, message } = req.body
    subject = translateSubject()
    // console.log(req.body)
    const isEmailSent = await sendEmail(firstName, lastName, email, subject, message)
    isEmailSent === true ? res.send("Email Sent") : res.send("Something went wrong!")
  })


app.listen(port, () => {
  console.log("listening on port", port)
})

