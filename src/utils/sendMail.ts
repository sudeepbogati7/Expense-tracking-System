import nodemailer from 'nodemailer';
require('dotenv').config();
import { Response } from 'express';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 587,
    auth: {
        user: 'deepfusionlabs080@gmail.com',
        pass: 'oekekpdpykzdqgcb'
    }
});

export const otpMailAfterRegister = (email: string, name: string, res: Response, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Verify OPT for registration ',
        html: `
            <b>Dear ${name}</b> <br>
            <div>Please verify the OTP for registration.</div><br>
            <div>Your OTP: <strong> ${otp} </strong> </div> <br>

            <span> Best regards </span> <br>
            <span> Sudeep Bogati</span> <br>
            <a href="https://github.com/sudeepbogati7" > Follow me </a>
        `
    };
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ message: "Error while sending email ", error: error.message })
            } else {
                res.status(200).json({ message: "Please check your email for OTP.", email: email })
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP, please try again later." });
    }
}

export const passwordResetTokenMail = (email: string, name: string, res: Response, otp: string) => {
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Password Reset Token',
        html: `
            <b>Dear ${name},</b>
            <span>Pleae use the following token in order to proceed your password reset request.</span>
            <p> Token : ${otp} </p> <br> 
            <span> Best regards </span> <br>
            <span> Sudeep Bogati</span> <br>
            <a href="https://github.com/sudeepbogati7" > Follow me </a>
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
