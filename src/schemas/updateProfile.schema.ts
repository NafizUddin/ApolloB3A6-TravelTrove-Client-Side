import { z } from "zod";

const updateProfileValidationSchema = z.object({
  name: z
    .string()
    .optional()
    .refine((value) => !value || value.length > 0, {
      message: "Please enter your name!",
    }),
  email: z
    .string()
    .optional()
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: "Please enter a valid email address!",
    }),
  image: z
    .any()
    .optional()
    .refine((file) => {
      // If file is provided, check it's a valid image
      return !file || (file instanceof File && file.type.startsWith("image/"));
    }, "Please upload a valid image file (JPG, PNG, etc.)"),
});

export default updateProfileValidationSchema;
