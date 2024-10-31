import { Router } from "express";
import validateInput from "./inputValidation";
import { signupInputData } from "./inputValidation/signup-validation";
import signUp from "./controllers/signup";

const router = Router();

router.post("/signup", validateInput(signupInputData), signUp);


export default router;
