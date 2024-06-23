import { Request, Response } from 'express';
import { User } from '../models/userModel';
import genAuthToken from '../utils/generateAuthToekn';
import * as _ from 'lodash';
import otpGenerator from 'otp-generator'
import { otpMailAfterRegister } from '../utils/sendMail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateUserRegistration } from '../utils/validateUserInput';

import NodeCache from 'node-cache';
const otpCache = new NodeCache();
const userCache = new NodeCache();
require('dotenv').config();


interface RegisterUserBody {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const jwt_secret: any = process.env.JWT_SECRET;
// <-------------------------- Sending OTP , storing userInfo in NodeCache  ---------------------------------->
const sendOTPAndCacheUserData = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        if (!fullName || !email || !password || !confirmPassword) return res.status(400).json({ success : false ,error: "All fields are required! " });
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(409).json({ success : false, error: "Email already Exists ! " });

        if (password !== confirmPassword) return res.status(401).json({ success : false, error: "Passwords must be same" });

        const otp: string = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });
        // const userData = { fullName, email, password };
        // // save OTP in node-cache
        // otpCache.set(email, otp);
        // userCache.set(email, userData);
        // res.cookie('user_email', email);
        // send OTP mail , configured in @utils/sendMail.ts
        otpMailAfterRegister(email, fullName, res, otp);
        const newUser = await User.create({
            fullName,
            email,
            password,
            otp
        });
        const token = genAuthToken(newUser);
        const userWithoutPassword = _.omit(newUser.toJSON(), ['password']);
        return res.status(201).json({
            success : true,
            message: "Successfully sent verification OTP.",
            user: userWithoutPassword,
            token : token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error :(",
        });
    }
};

// <-------------------------- Register user if OTP is corrent and valid  ---------------------------------->
const registerUserAfterOTPVerification = async (req: Request, res: Response) => {
    try {
        const { otp, email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email not found ! Please complete the initial registration first ."
            });
        }
        if (!otp) return res.status(400).json({
            success: false, 
            error: "Please enter your OTP"
        })

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({
            success : false, 
            error: "No user found with the provided email."
        });
        const otpFromDB = user.otp;

        // Verify OTP
        if (otpFromDB == otp) {
            try {
                user.isVerified = true;
                user.otp = '';
                user.save();
                return res.status(200).json({
                    success :true,
                    message: "Verification Successful",
                    user: user
                });
            } catch (error) {
                return res.status(500).json({
                    success : false, 
                    error: "Opps , something went wrong. Please try again later"
                });
            }
        } else {
            return res.status(401).json({
                success : false, 
                error: "Invalid OTP. Please enter the correct OTP."
            });
        }
    } catch (err) {
        res.status(500).json({
            success : false, 
            error: "Internal Server Error :( , Please try again later. "
        });
    }
};
// <-------------------------- Login  ---------------------------------->
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({
            success : false, 
            error: "No User Found ! Have you registered ?"
        });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const userWithoutPassword = _.omit(user.toJSON(), ['password']);
            const token = genAuthToken(user);
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            res.cookie("token", token, { expires: expirationDate })
            return res.status(200).json({
                success : true,
                message: "Login Successfull !",
                user: userWithoutPassword,
                token: token
            });
        } else {
            return res.status(401).json({
                success : false, 
                error: "Invalid email or password"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success : false, 
            message: "Opps ! Something went wrong :(", error: "Internal Server Error !"
        });
    }
}

// <------------------- User profile ----------------------------------->
export const userProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const user = await User.findOne({ where: { userId } });
    if (!user) res.status(404).json({
        success: false,
        error: "No user found !"
    });
    return res.status(200).json({
        success: true,
        user: user
    });
}
// <-------------------------- Logout  ---------------------------------->
const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success : true, 
            message: "Logout Successful ;) "
        })
    } catch (err) {
        res.status(500).json({
            success : false, 
            error: " Internal Server Error :( "
        })
    }
}
// <-------------------------- Forget Password ---------------------------------->
import { passwordResetTokenMail } from '../utils/sendMail';
import { any } from 'joi';
const reset_otp_cache = new NodeCache();

const forgetPasswordMailController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(403).json({
            success : false, 
            error: "Please enter your associated email."
        });
        const user = await User.findOne({ where: { email } });
        const otp: string = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });

        if (!user) return res.status(404).json({
            success : false, 
            error: "No user found associated with the provided email."

        });
        passwordResetTokenMail(email, user.fullName, res, otp)
        user.otp = otp;
        user.save();
        return res.status(200).json({
            success : true, 
            message: "We have sent you an OTP email. Check your email inbox."
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success : false, 
            error: "Internal Server Error :( Please try again later."
        });
    }
};
const forgetPasswordHandler = async (req: Request, res: Response) => {
    try {
        let { otp , password, confirmPassword , email } = req.body;
        if (!password || !confirmPassword) return res.status(400).json({
            success : false, 
            error: "Please set your new password"
        });
        otp.trim();
        confirmPassword = confirmPassword.trim();
        password = password.trim();

        if (!otp) return res.status(400).json({
            success : false, 
            error: "Please enter your OTP"
        });
        
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({
            success : false, 
            error: "NO USER FOUND !!"
        });
        const otpFromDB = user.otp;
        if (!otpFromDB) return res.status(404).json({ "error": "Failed to fetch your OTP." });
        if (password !== confirmPassword) return res.status(400).json({
            success : false, 
            error: "Passwords don't match "
        });
        if (otp !== otpFromDB) return res.status(400).json({
            success : false, 
            error: "Invalid or incorrect OTP "
        });
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        user.save();
        return res.status(200).json({
            success : true, 
            message: "Password reset successful"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success : false, 
            error: "Internal Server Error :( Please try again later."
        });
    }
};
export { loginUser, sendOTPAndCacheUserData, registerUserAfterOTPVerification, logoutUser, forgetPasswordMailController, forgetPasswordHandler };
