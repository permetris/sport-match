const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (recepient, subject, html) => {
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: '1025',
        secure: false
    });

    const mailOptions = {
        from: process.env.MAIL_SENDER,
        to: `${recepient}`,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        error ? console.error(error) : console.log('Email sent: ' + info.response);
    });
};

module.exports.sendEmail = sendEmail;
