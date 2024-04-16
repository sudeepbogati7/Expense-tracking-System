import { Request, Response } from 'express';
import { User } from '../models/userModel';
import genAuthToken from '../utils/generateAuthToekn';
import * as _ from 'lodash';

interface RegisterUserBody {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const registerUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) return res.status(409).json({ error: "Email already Exists ! " });

        if (password !== confirmPassword) return res.status(401).json({ error: "Passwords must be same" });

        const newUser = await User.create({
            fullName,
            email,
            password
        });
        // jwt token 
        // const token = genAuthToken(newUser);
        const token = genAuthToken(newUser);
        const userWithoutPassword = _.omit(newUser.toJSON(), ['password']);

        res.status(201).json({
            message: "Successfully registered new user ",
            user: userWithoutPassword,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error :(",
        });
        console.log(error);
    }
};

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "No User Found ! Have you registered ?" });
        const userWithoutPassword = _.omit(user.toJSON(), ['password']);
        const token = genAuthToken(user);
        res.status(200).json({
            message: "Login Successfull !",
            user: userWithoutPassword,
            token: token

        })
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

export { loginUser, registerUser, logoutUser };