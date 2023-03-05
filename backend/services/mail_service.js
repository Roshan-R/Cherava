"use strict";
const nodemailer = require("nodemailer");

async function sendMail(email, subject, body) {

    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.PASS, // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: body // plain text body
        // html: "<b>Hello world?</b>", // html body
    });

    return (info.messageId);

}

module.exports = {
    sendMail: sendMail
};