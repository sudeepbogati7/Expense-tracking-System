import jwt from 'jsonwebtoken';
import { Response } from 'express';

interface userType {
    userId: number,
    fullName: string,
    email: string,
    password: string,
}

const genAuthToken = (user: userType) => {
    const jwtSecretKey: any = process.env.JWT_SECRET;
    const token = jwt.sign(
        {
            userId : user.userId,
            fullName: user.fullName,
            email: user.email,
        },
        jwtSecretKey,
        { expiresIn: '30d' });

    return token;
}

export default genAuthToken;
