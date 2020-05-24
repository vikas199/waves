const mailer = require("nodemailer")
const { welcome } = require("./welcome_template")
require("dotenv").config()

const getEmailData = (to, name, token, template) => {
  let data = null
  switch (template) {
    case "welcome":
      data = {
        from: "waves <mvikasraj1471@gmail.com>",
        to,
        subject: `Welcome to waves ${name}`,
        text: "Testing our emails",
        html: welcome(),
      }
      break
    default:
      data
  }
  return data
}

const sendEmail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mvikasraj1471@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mail = getEmailData(to, name, token, type)
  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log("error", error)
    } else {
      console.log("email sent")
    }
    smtpTransport.close()
  })
}

module.exports = { sendEmail }
