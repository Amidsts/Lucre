import z from "zod";

export const editProfileInputData = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNo: z.string(),
  email: z.string(),
  address: z.string(),
  dateOfBirth: z.string(),
});
