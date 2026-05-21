import z, { array } from "zod";

const bookmarkCreationValidator = (bookmark) => {
  const schema = z.object({
    url: z.string().url({ message: "Please provide a valid URL" }).nonempty(),
    title: z.string().min(3).max(255).nonempty().trim(),
    notes: z.string().optional().nullable().max(1000),
    tags: z.array(z.string().trim().length(30).toLowerCase()).optional(),
    category: z.string().optional().trim().max(50),
  });
  return schema.safeParse(bookmark);
};

const bookmarkUpdateValidator = (bookmark) => {
  const schema = z.object({
    title: z.string().min(3).max(255).nonempty().trim().optional(),
    notes: z.string().optional().nullable().max(1000),
    tags: z.array(z.string().trim().length(30).toLowerCase()).optional(),
    category: z.string().optional().trim().max(50),
  });
  return schema.safeParse(bookmark);
};

export const bookmarkValidator = {
  ValidateCreate: bookmarkCreationValidator,
  ValidateUpdate: bookmarkUpdateValidator,
};
