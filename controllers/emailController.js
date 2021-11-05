const config = require("../config");
const nodemailer = require("nodemailer");
let transport = nodemailer.createTransport(config.transportOptions);

const sendMail = async (options, res, next) => {
  try {
    const mailOptions = {
      from: "appmedfit@gmail.com", // Sender address
      to: options.patientEmail, // List of recipients
      subject: "Medfit- Video Consultation Booking Confirmation", // Subject line
      html: `
            <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
            <p style="font-size: 14px; line-height: 140%;"></p>
            <p style="font-size: 14px; line-height: 140%;">Dear ${options.patientName},
            <br />
            <br />
            Your video consultation with Dr ${options.doctorName} is confirmed for ${options.fullDate}.&nbsp;
             Please join the video call on laptop browser, 2 mins before the scheduled time and ensure you have good network connectivity.</p>
            <p style="font-size: 14px; line-height: 140%;"><br />Regards,<br />Medfit Team</p>
            </div>
        `,
    };
    transport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        res.status(200).send("Mail sent Successfully");
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  sendMail,
};
