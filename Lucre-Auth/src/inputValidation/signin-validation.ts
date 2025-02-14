import { z } from "zod";

export const signinInputData = z.object({
  email: z.string().email(),
  password: z.string(),
});
