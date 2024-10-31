import z from "zod";

export const signupInputData = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    phoneNo: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    address: z.string(),
    dateOfBirth: z.string(),
  })
  .refine(({ password, confirmPassword }) => {
    return password === confirmPassword;
  });
