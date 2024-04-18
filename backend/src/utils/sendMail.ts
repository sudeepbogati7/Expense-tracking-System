import nodemailer from 'nodemailer';
require('dotenv').config();
import { Response } from 'express';
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS
    }
});


const mailAfterRegister = (email: string, name: string, res: Response) => {
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Verify OPT for registration ',
        html: `
            <p>Dear ${name}</p> <br>
            <p>Please verify the OTP for registration.</p>
        `
    };
    try {
        transporter.sendMail(mailOptions)
        res.status(200).json({ message: "Please check your gmail for OTP." });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong :( , Please try again in some moment." });
    }
}