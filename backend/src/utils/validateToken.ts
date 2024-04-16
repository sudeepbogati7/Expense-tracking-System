import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
