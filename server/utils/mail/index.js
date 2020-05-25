const mailer = require("nodemailer")
const { welcome } = require("./welcome_template")
const { purchase } = require("./purchase_template")
const { resetPassword } = require("./reset_password")
require("dotenv").config()

const getEmailData = (to, name, token, template, actionData) => {
  let data = null
  switch (template) {
    case "welcome":
      data = {
        from: "waves <mvikasraj1471@gmail.com>",
        to,
        subject: `Welcome to waves ${name}`,
        html: welcome(),
      }
      break
    case "purchase":
      data = {
        from: "waves <mvikasraj1471@gmail.com>",
        to,
        subject: `Thanks for shopping with us ${name}`,
        html: purchase(actionData),
      }
      break;
      case "reset_password":
        data = {
          from: "waves <mvikasraj1471@gmail.com>",
          to,
          subject: `Hey  ${name}, reset your password`,
          html: resetPassword(actionData),
        }
        break
    default:
      data
  }
  return data
}

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mvikasraj1471@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mail = getEmailData(to, name, token, type, actionData)
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
