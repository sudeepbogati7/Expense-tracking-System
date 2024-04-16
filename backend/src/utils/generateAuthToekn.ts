import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface userType {
    userId: number,
    fullName: string,
    email: string,
    password: string,
}

const genAuthToken = (user: userType, res: Response) => {
    const jwtSecretKey: any = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            userId: user.userId,
            fullName: user.fullName,
            email: user.email,
            password: user.password
        },
        jwtSecretKey,
        { expiresIn: '30d' });

    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days expiration
}

export default genAuthToken;
