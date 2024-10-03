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
    .refine((fileList) => {
      // Ensure the fileList is either empty or contains a valid image file
      if (!fileList || fileList.length === 0) return true; // No file uploaded, valid case
      const file = fileList[0]; // Get the first file (if any)
      return file instanceof File && file.type.startsWith("image/");
    }, "Please upload a valid image file (JPG, PNG, etc.)"),
});

export default updateProfileValidationSchema;
