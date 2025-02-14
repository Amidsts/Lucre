import z from "zod";

export const signupInputData = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNo: z.string(),
    email: z.string(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          "Password must be at least 8 characters long, contain at least one special character, and at least one number.",
      }),
    confirmPassword: z.string(),
    address: z.string(),
    dateOfBirth: z.string(),
  })
  .refine(({ password, confirmPassword }) => {
    return password === confirmPassword;
  });
