import z from "zod";

export const changePasswordInputData = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          "Password must be at least 8 characters long, contain at least one special character, and at least one number.",
      }),
    confirmPassword: z.string(),
  })
  .refine(({ newPassword, confirmPassword }) => {
    return newPassword === confirmPassword;
  });
