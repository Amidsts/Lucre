import { Router } from "express";
import validateInput from "./inputValidation";
import { signupInputData } from "./inputValidation/signup-validation";
import signUp from "./controllers/signup";
import signIn from "./controllers/signin";
import sendOtp from "./controllers/forgot-password";
import { changePasswordInputData } from "./inputValidation/change-password-valdation";
import changePassword from "./controllers/change-password";
import validateToken from "./middlewares/validateToken";
import { editProfileInputData } from "./inputValidation/edit-profile-validation";
import editProfile from "./controllers/edit-profile";
import retriveProfile from "./controllers/get-profile";
import { signinInputData } from "./inputValidation/signin-validation";
import { forgotPasswordInputData } from "./inputValidation/forgot-password-validation";
import { resetPasswordSchema } from "./inputValidation/reset-password-validation";
import resetPassword from "./controllers/reset-password";
import verifyOtp from "./controllers/verify-otp";
import { verifyOtpSchema } from "./inputValidation/verify-otp";

const router = Router();

router.post("/signup", validateInput(signupInputData), signUp);
router.post("/signin", validateInput(signinInputData), signIn);
router.post(
  "/forgot-password",
  validateInput(forgotPasswordInputData),
  sendOtp
);
router.post(
  "/resend-forgotpassword-otp",
  validateInput(forgotPasswordInputData),
  sendOtp
);
router.patch(
  "/reset-password",
  validateInput(resetPasswordSchema),
  resetPassword
);
router.post("/verify-otp", validateInput(verifyOtpSchema), verifyOtp);

router.use(validateToken);

router.patch(
  "/change-password",
  validateInput(changePasswordInputData),
  changePassword
);
router.patch("/edit-profile", validateInput(editProfileInputData), editProfile);
router.get("/profile", retriveProfile);

export default router;
