import nodemailer from 'nodemailer';
require('dotenv').config();
import { Response } from 'express';
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'gmail',
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS
    }
});


export const otpMailAfterRegister = (email: string, name: string, res: Response, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Verify OPT for registration ',
        html: `
            <p>Dear ${name}</p> <br>
            <p>Please verify the OTP for registration.</p><br>
            <p>Your OTP: <strong> ${otp} </strong> </p> <br>

            <span> Best regards </span> <br>
            <span> Sudeep Bogati</span> <br>
            <a href="https://github.com/sudeepbogati7" > Follow me </a> ?
        `
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: "Error while sending email ", error: error.message })
            } else {
                res.status(200).json({ message: "Email sent succussfully ", info: info.response })
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP, please try again later." });
    }
}

export const passwordResetMail = (email: string, name: string, res: Response, resetLink: any) => {
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Rest your password ',
        html: `
            <p>Dear ${name}</p>,
            <p>Pleae follow the following link in order to reset your password.</p>
            <p> Reset Link : <a href=${resetLink} > <b> ${resetLink} </b> </a> </p> 
            <span> Best regards </span> <br>
            <span> Sudeep Bogati</span> <br>
            <a href="https://github.com/sudeepbogati7" > Follow me </a> ?
        `
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: "Error while sending email ", error: error.message })
            } else {
                res.status(200).json({ message: "Email sent succussfully ", info: info.response })
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP, please try again later." });
    }
}
