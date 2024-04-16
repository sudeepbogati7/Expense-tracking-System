import { Response, Request, NextFunction } from "express";
import Joi from 'joi';

export const validateUserRegistration = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        fullName: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details.map((detail) => detail.message) });
    }

    next();
};