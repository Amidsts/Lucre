import { Router } from "express";
import validateInput from "./inputValidation";
import { signupInputData } from "./inputValidation/signup-validation";
import signUp from "./controllers/signup";
import signIn from "./controllers/signin";
import forgotPassword from "./controllers/forgot-password";
import { changePasswordInputData } from "./inputValidation/change-password-valdation";
import changePassword from "./controllers/change-password";
import validateToken from "./middlewares/validateToken";
import { editProfileInputData } from "./inputValidation/edit-profile-validation";
import editProfile from "./controllers/edit-profile";
import retriveProfile from "./controllers/get-profile";

const router = Router();

router.post("/signup", validateInput(signupInputData), signUp);
router.post("/signin", validateInput(signupInputData), signIn);
router.post("/forgot-password", validateInput(signupInputData), forgotPassword);

router.use(validateToken);

router.patch(
  "/change-password",
  validateInput(changePasswordInputData),
  changePassword
);
router.patch("/edit-profile", validateInput(editProfileInputData), editProfile);
router.get("/profile", retriveProfile);

export default router;
