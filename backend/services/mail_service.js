"use strict";
import {createTransport} from "nodemailer";

async function sendMail(subject, body, user, pass) {

    let transporter = createTransport({
        service: "hotmail",
        auth: {
            user: user, // generated ethereal user
            pass: pass, // generated ethereal password
        }
    });

    let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "Here are the changes",
        html: `<div> <br/> ${body} <div/>`
    });

    return(info.messageId);

}

export {
    sendMail
};
