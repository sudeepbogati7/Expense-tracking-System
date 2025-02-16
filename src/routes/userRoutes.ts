import { loginUser, logoutUser,userProfile, registerUserAfterOTPVerification, sendOTPAndCacheUserData, forgetPasswordMailController, forgetPasswordHandler } from "../controllers/userController";
import Express from "express";
import { validateUserRegistration } from "../utils/validateUserInput";
import { validateToken } from "../utils/validateToken";
const router = Express.Router();


router.post('/login', loginUser); 
router.post('/register',validateUserRegistration, sendOTPAndCacheUserData);
router.post('/register/verify-otp', registerUserAfterOTPVerification);
router.post('/logout', logoutUser)
router.post('/forget-password', forgetPasswordMailController);
router.post('/forget-password/reset', forgetPasswordHandler);
router.get('/profile',validateToken,userProfile )


export default router;