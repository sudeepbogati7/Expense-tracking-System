import { Request, Response } from 'express';
import { User } from '../models/userModel';
import genAuthToken from '../utils/generateAuthToekn';
import * as _ from 'lodash';

interface RegisterUserBody {
    fullName: string;
    email: string;
    password: string;
}
const registerUser = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (user) return res.status(409).json({ error: "Email already Exists ! " });
        if (!fullName || !email || !password) return res.status(401).json({ error: "All fields are required !" });

        const newUser = await User.create({
            fullName,
            email,
            password
        });
        // jwt token 
        // const token = genAuthToken(newUser);
        genAuthToken(newUser, res);
        const userWithoutPassword = _.omit(newUser.toJSON(), ['password']);

        res.status(201).json({
            message: "Successfully registered new user ",
            user: userWithoutPassword,
            // token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error !",
            error: error
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
        res.status(200).json({
            message: "Login Successfull !",
            user: userWithoutPassword,

        })
    } catch (error) {
        res.status(500).json({ message: "Opps ! Something went wrong", error: "Internal Server Error !" });
    }
}

export { loginUser, registerUser };