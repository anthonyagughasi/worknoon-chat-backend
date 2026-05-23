const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

exports.sendOfflineNotification = async (recipientEmail, senderName, messageText) => {
  try {
    await transporter.sendMail({
      from: `"Worknoon Systems" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `Missed update alert from ${senderName}`,
      html: `<p><strong>${senderName}</strong> sent you a message: "${messageText}". Log in to review.</p>`
    });
  } catch (error) {
    console.error('System failure sending fallback alert:', error);
  }
};
