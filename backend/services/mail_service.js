"use strict";
import { createTransport } from "nodemailer";

async function sendMail(email, subject, body) {

    try {
        let transporter = createTransport({
            service: "hotmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: "Here are the changes",
            html: `<div> <br/> ${body} <div/>`
        });

        return (info.messageId);
    }
    catch (e) {
        console.log(e);
    }

}

export {
    sendMail
};
