import { Request, Response } from 'express';
import { User } from '../models/userModel';
import genAuthToken from '../utils/generateAuthToekn';
import * as _ from 'lodash';
import otpGenerator from 'otp-generator'
import { otpMailAfterRegister } from '../utils/sendMail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import NodeCache from 'node-cache';
const otpCache = new NodeCache();
const userCache = new NodeCache();

interface RegisterUserBody {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

require('dotenv').config();
const jwt_secret: any = process.env.JWT_SECRET;
// <-------------------------- Sending OTP , storing userInfo in NodeCache  ---------------------------------->
const sendOTPAndCacheUserData = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        if (!fullName || !email || !password || !confirmPassword) return res.status(400).json({ error: "All fields are required! " });
        const user = await User.findOne({ where: { email } });
        if (user) return res.status(409).json({ error: "Email already Exists ! " });

        if (password !== confirmPassword) return res.status(401).json({ error: "Passwords must be same" });

        const otp: string = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });


        const userData = { fullName, email, password };
        // save OTP in node-cache
        otpCache.set(email, otp);
        userCache.set(email, userData);

        res.cookie('user_email', email);

        // send OTP mail , configured in @utils/sendMail.ts
        otpMailAfterRegister(email, fullName, res, otp);


    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error :(",
        });
        console.log(error);
    }
};

// <-------------------------- Register user if OTP is corrent and valid  ---------------------------------->
const registerUserAfterOTPVerification = async (req: Request, res: Response) => {
    try {
        const email = req.cookies.user_email;
        if (!email) {
            return res.status(400).json({
                error: "Email not found ! Please complete the initial registration first ."
            });
        }
        const { otp } = req.body;

        const userData: any = userCache.get(email);
        const cachedOTP = otpCache.get(email);
        if (!userData || !cachedOTP) {
            return res.status(400).json({ error: "User data or OTP not found. Please request OTP again." });
        }
        // Verify OTP
        if (cachedOTP == otp) {
            try {

                const newUser = await User.create({
                    fullName: userData.fullName,
                    email: userData.email,
                    password: userData.password
                });
                // Generate JWT token
                const token = genAuthToken(newUser);
                // Omit password from user object
                const userWithoutPassword = _.omit(newUser.toJSON(), ['password']);
                // Remove user data from cache after registration & email cookie from cookies
                res.status(201).json({
                    message: "User registration successful.",
                    user: userWithoutPassword,
                    token: token
                });

                // sending token through cookies as well 
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 30);
                res.cookie("token", token, { expires: expirationDate })
                userCache.del(email);
                otpCache.del(email);
                res.clearCookie('user_email');
            } catch (error) {
                res.status(500).json({ error: "Opps , something went wrong. Please try again later" });
                console.log("Error while saving into database :", error);
            }
        } else {
            return res.status(401).json({ error: "Invalid OTP. Please enter the correct OTP." });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error :( , Please try again later. " });
    }
};

// <-------------------------- Login  ---------------------------------->
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;



        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "No User Found ! Have you registered ?" });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const userWithoutPassword = _.omit(user.toJSON(), ['password']);
            const token = genAuthToken(user);
            res.status(200).json({
                message: "Login Successfull !",
                user: userWithoutPassword,
                token: token
            })
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 30);
            res.cookie("token", token, { expires: expirationDate })
        } else {
            return res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Opps ! Something went wrong :(", error: "Internal Server Error !" });
    }
}


// <-------------------------- Logout  ---------------------------------->
const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout Successful ;) " })
    } catch (err) {
        res.status(500).json({ error: " Internal Server Error :( " })
    }
}

// <-------------------------- Forget Password ---------------------------------->
import { passwordResetTokenMail } from '../utils/sendMail';
const reset_otp_cache = new NodeCache();

const forgetPasswordMailController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(403).json({ error: "Please enter your associated email." });
        const user = await User.findOne({ where: { email } });
        const otp: string = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });
        // save the data to the cache 
        res.cookie('reset_email', email);
        reset_otp_cache.set(email, otp);

        if (!user) return res.status(404).json({ message: "No user found associated with the provided email." });
        passwordResetTokenMail(email, user.fullName, res, otp)
        return res.status(200).json({ message: "We have sent you an OTP email. Check your email inbox." });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error :( Please try again later." });
    }
};


const forgetPasswordHandler = async (req: Request, res: Response) => {
    try {
        let { otp, password, confirmPassword } = req.body;
        if (!password || !confirmPassword) return res.status(400).json({ error: "Please set your new password" });

        otp = otp.trim();
        password = password.trim();
        if (!otp) return res.status(400).json({ error: "Please enter your OTP" });
        confirmPassword = confirmPassword.trim();
        const email = req.cookies.reset_email;
        const cachedOTP = reset_otp_cache.get(email);

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: "NO USER FOUND !!" });
        if (password !== confirmPassword) return res.status(400).json({ error: "Passwords don't match " });
        if (otp !== cachedOTP) return res.status(400).json({ error: "Invalid or incorrect OTP " });
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        user.save();
        return res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error :( Please try again later."
        });
    }
};
export { loginUser, sendOTPAndCacheUserData, registerUserAfterOTPVerification, logoutUser, forgetPasswordMailController, forgetPasswordHandler };