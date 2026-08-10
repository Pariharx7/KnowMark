import z from "zod";

const bookmarkUpdateSchema = z.object({
  title: z.string().min(3).max(255).trim().nonempty().optional(),
  notes: z.string().max(1000).optional().nullable(),
  tags: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        const rawArray = value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
        return rawArray.length > 0 ? rawArray : undefined;
      }
      return value;
    },
    z
      .array(
        z
          .string()
          .max(9, "Each tag must be 9 characters or less")
          .trim()
          .toLowerCase(),
      )
      .max(4, "You can have a maximum of 4 tags")
      .optional(),
  ),
  category: z.string().trim().max(50).optional(),
});

export default bookmarkUpdateSchema;
