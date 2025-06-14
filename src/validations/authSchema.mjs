import Joi from "joi";

export const signUp = {
  body: Joi.object({
    username: Joi.string().min(3).required("username required"),
    email: Joi.string().email().required("email required"),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!]{3,25}$')).required(),
    confirm_password: Joi.ref('password'),
  })
};

export const signIn = {
  body: Joi.object({
    email: Joi.string().email().required("email required"),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!]{3,25}$')).required(),
  })
};

export const forgotPassword = {
  body: Joi.object({
    email: Joi.string().email().required("email required"),
  })
};

export const resetPassword = {
  params: Joi.object({
    token: Joi.string().required(),
  }),
  body: {
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*!]{3,25}$')).required(),
    confirm_password: Joi.ref('password'),
  }
};