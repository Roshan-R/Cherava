"use strict";
import {createTransport} from "nodemailer";

async function sendMail(subject, body, user, pass) {
	//console.log(subject, body, user, pass)
    
	let transporter = createTransport({
        service: "hotmail",
        auth: {
            user: user, // generated ethereal user
            pass: pass, // generated ethereal password
        }
    });

    let info = await transporter.sendMail({
        from: user, // sender address
        to: "roshanr2001@gmail.com", // list of receivers
        subject: subject, // Subject line
        // plain text body,
		text: "Here are the changes",
        html: `<div> <br/> ${body} <div/>`, // html body
    });

    return(info.messageId);

}

export default sendMail;
