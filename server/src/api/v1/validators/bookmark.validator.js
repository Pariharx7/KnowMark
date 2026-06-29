import z, { array } from "zod";

const bookmarkCreationValidator = (bookmark) => {
  const schema = z.object({
    url: z.string().url({ message: "Please provide a valid URL" }).nonempty(),
    title: z.string().min(3).max(255).trim().nonempty(),
    notes: z.string().max(999).optional().nullable(),
    tags: z.array(z.string().trim().min(2).max(19).toLowerCase()).optional(),
    category: z.string().trim().max(50).optional(),
  });
  return schema.safeParse(bookmark);
};

const bookmarkUpdateValidator = (bookmark) => {
  const schema = z.object({
    title: z.string().min(3).max(255).trim().nonempty().optional(),
    notes: z.string().max(1000).optional().nullable(),
    tags: z
      .array(
        z
          .string()
          .max(9, "Each tag must be 9 characters or less")
          .trim()
          .toLowerCase()
      )
      .max(4, "You can have a maximum of 4 tags")
      .optional(),
    category: z.string().trim().max(50).optional(),
  });
  return schema.safeParse(bookmark);
};

export const bookmarkValidator = {
  ValidateCreate: bookmarkCreationValidator,
  ValidateUpdate: bookmarkUpdateValidator,
};
