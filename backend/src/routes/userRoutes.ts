import { loginUser, registerUser } from "../controllers/userController";
import Express from "express";
import { validateUserRegistration } from "../utils/validateUserInput";
import { validateToken } from "../utils/validateToken";
const router = Express.Router();


router.post('/login', validateToken, loginUser);
router.post('/register', validateUserRegistration, registerUser);

export default router;