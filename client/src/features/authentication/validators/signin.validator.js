import z, { email } from "zod";

const signinSchema = z.object({
  email: z
    .string({ reqiured_error: "Email is required" })
    .email("Please enter a valid email address"),

  password: z
    .string({ reqiured_error: "Password is required" })
    .min(1, "Password is required"),
});

export default signinSchema;
