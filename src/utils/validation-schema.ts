import { Joi } from "celebrate";

export const registerAccountSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .message(
      '"password" must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object().keys({
  refreshToken: Joi.string().required(),
});

export const updateClientSchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().trim().email().lowercase().optional(),
  businessType: Joi.string().trim().optional(),
});