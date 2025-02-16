import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized: No authorization header provided' });
    }

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Unauthorized: Invalid authorization header format' });
    }

    const token = tokenParts[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

