import { loginUser, logoutUser, registerUser } from "../controllers/userController";
import Express from "express";
import { validateUserRegistration } from "../utils/validateUserInput";
import { validateToken } from "../utils/validateToken";
const router = Express.Router();


router.post('/login', loginUser);
router.post('/register', validateUserRegistration, registerUser);
router.post('/logout', logoutUser)

export default router;