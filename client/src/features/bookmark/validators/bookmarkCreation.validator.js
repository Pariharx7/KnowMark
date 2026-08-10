import z, { array } from "zod";

const bookmarkCreationSchema = z.object({
  url: z.string().url({ message: "Please provide a valid URL" }).nonempty(),
  title: z
    .string({ message: "Please provide a title" })
    .min(3)
    .max(255)
    .trim()
    .nonempty(),
  notes: z.string().max(999).optional().nullable(),
  tags: z.preprocess((value) => {
    if (typeof value === 'string') {
      const rawArray = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      return rawArray.length > 0 ? rawArray : undefined;
    }
    return value;
  }, z.array(z.string().trim().min(2).max(19).toLowerCase()).optional()),
  category: z.string().trim().max(50).optional(),
});

export default bookmarkCreationSchema;
