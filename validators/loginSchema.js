import vine from "@vinejs/vine";

const loginSchema = vine.object({
  password: vine.string().minLength(8).maxLength(32),
  email: vine.string(),
});

export default loginSchema;
