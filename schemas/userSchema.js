import Joi from "joi";
import { PASSWD_REGEX } from "../constants/regex.js";

export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASSWD_REGEX).required(),
  subscription: Joi.string().valid("starter", "pro", "business")
})

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PASSWD_REGEX).required(),
})
