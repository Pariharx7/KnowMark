import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

const userUpdateValidator = (user) => {
  console.log("User in ", user);
  const schema = z
    .object({
      name: z
        .string()
        .trim()
        .min(3, { message: "Must be 3 or more characters long" })
        .max(255, { message: "Must be 255 or fewer characters long" })
        .optional(),

      // `image` is expected to be a string (data URL or remote URL)
      image: z.string().optional(),

      oldPassword: z.string().min(1).optional(),

      newPassword: z
        .string()
        .min(6)
        .refine((p) => passwordRegex.test(p), {
          message:
            "Password must have at least 6 characters, one uppercase, one lowercase letter, one digit, and one special character.",
        })
        .optional(),

      confirmNewPassword: z.string().optional(),
    })
    .strict()
    .refine(
      (data) => {
        if (data.oldPassword) {
          return (
            typeof data.newPassword === "string" &&
            typeof data.confirmNewPassword === "string" &&
            data.newPassword === data.confirmNewPassword
          );
        }
        return true;
      },
      { message: "Passwords do not match", path: ["confirmNewPassword"] }
    );

  return schema.safeParse(user);
};

export const userValidator = {
  ValidateUpdate: userUpdateValidator,
};
