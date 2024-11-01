import { z } from "zod";

export const forgotPasswordInputData = z.object({
  email: z.string().email(),
});
