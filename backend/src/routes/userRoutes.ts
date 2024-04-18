import { loginUser, logoutUser, registerUserAfterOTPVerification, sendOTPAndCacheUserData } from "../controllers/userController";
import Express from "express";
import { validateUserRegistration } from "../utils/validateUserInput";
import { validateToken } from "../utils/validateToken";
const router = Express.Router();


router.post('/login', loginUser); //login user
router.post('/register', sendOTPAndCacheUserData);
router.post('/register/verify-otp', registerUserAfterOTPVerification);
router.post('/logout', logoutUser)

export default router;