"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function signUp(req, res) {
    //STEP 1:
    //collect info, fullName, email, phone Number, address, password(min8, uppercase, lowercase, number and special char), comparePassword, date of birth
    //ensure password is the same in validation
    //check if user exist
    //if user exist throw an error,
    //create a user account, with acctSetUpProgress=50%
    //send account verification code to the user, publish acct:verification email to the user
    //STEP 2
    //verify user identity (KYC)
    //generate an account number
    //create a money account
    //update a user account
    //publish an account:creation event (this ensure the notification service is aware and send email notification to the user)
}
exports.default = signUp;
