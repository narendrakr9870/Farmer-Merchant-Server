const nodeMailer = require("nodemailer");

const sendEmail = async (details) => {

    const transporter = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: details.email,
        subject: details.subject,
        text: details.message,
      };
    
      await transporter.sendMail(mailOptions);
    };

module.exports = sendEmail;