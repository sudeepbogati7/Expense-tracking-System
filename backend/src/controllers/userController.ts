import { Request, Response } from 'express';
import { User } from '../models/userModel';
import genAuthToken from '../utils/generateAuthToekn';
import * as _ from 'lodash';
import otpGenerator from 'otp-generator'
import { otpMailAfterRegister } from '../utils/sendMail';
import bcrypt from 'bcrypt';

import NodeCache from 'node-cache';
const otpCache = new NodeCache();
const userCache = new NodeCache();

interface RegisterUserBody {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const sendOTPAndCacheUserData = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) return res.status(409).json({ error: "Email already Exists ! " });

        if (password !== confirmPassword) return res.status(401).json({ error: "Passwords must be same" });

        const otp: string = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false });


        const userData = { fullName, email, password };
        // save OTP in node-cache
        otpCache.set(email, otp);
        userCache.set(email, userData);

        res.cookie('user_email', email, { httpOnly: true });

        // send OTP mail , configured in @utils/sendMail.ts
        otpMailAfterRegister(email, fullName, res, otp);


    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error :(",
        });
        console.log(error);
    }
};


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

        console.log("Userdata from cache ; ===============> ", userData);

        if (!userData || !cachedOTP) {
            return res.status(400).json({ error: "User data or OTP not found. Please request OTP again." });
        }

        console.log("cached OTP : ==> ", cachedOTP, "typeof cached otp : ", typeof (cachedOTP));
        console.log("OTP entered by the user : ", otp, "typeof user otp: ", typeof (otp));

        // Verify OTP
        if (cachedOTP == otp) {
            const newUser = await User.create({
                fullName: userData.fullName,
                email: userData.email,
                password: userData.password
            });
            // Generate JWT token
            const token = genAuthToken(newUser);
            console.log("TOken generated :", token);
            // Omit password from user object
            const userWithoutPassword = _.omit(newUser.toJSON(), ['password']);
            console.log("User without password : ", userWithoutPassword);
            // Remove user data from cache after registration & email cookie from cookies
            res.status(201).json({
                message: "User registration successful.",
                user: userWithoutPassword,
                token: token
            });
        } else {
            return res.status(401).json({ error: "Invalid OTP. Please enter the correct OTP." });
        }
    } catch (err) {
        console.log("actual error ------------------->>>>>>>>>>>>>>>", err)
        res.status(500).json({ error: "Internal Server Error :( , Please try again later. " });
    }
};

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
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Opps ! Something went wrong :(", error: "Internal Server Error !" });
    }
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout Successful ;) " })
    } catch (err) {
        res.status(500).json({ error: " Internal Server Error :( " })
    }
}

export { loginUser, sendOTPAndCacheUserData, registerUserAfterOTPVerification, logoutUser };