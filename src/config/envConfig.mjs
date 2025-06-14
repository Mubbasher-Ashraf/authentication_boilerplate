import Joi from "joi";
import { config } from "dotenv";
import * as Logs from "../utils/customLog.mjs";

// Load env variables
config();

const envVarsSchema = Joi.object({
    // General variable validations
    NODE_ENV: Joi.string().default("development"),
    APP_VERSION: Joi.string().default("1.0.0"),

    // Server setup validations
    SERVER_PORT: Joi.number().default(4040),
    SERVER_HOST: Joi.string().default("127.0.0.1"),

    // Database details validations
    MONGO_DB_URI: Joi.string()
        .required()
        .description("Mongo url required to connect with database"),

    // Email details validations
    EMAIL_HOST: Joi.string()
        .required()
        .description("Email host is required to send emails."),
    EMAIL_PORT: Joi.string()
        .required()
        .description("Email post is required to setup email service."),
    EMAIL_USER: Joi.string()
        .required()
        .description("Email address is required to send emails."),
    EMAIL_PASS: Joi.string()
        .required()
        .description("Email password is required to send emails."),
    EMAIL_SECURE: Joi.string()
        .required()
        .description("is email service using is secure?"),

    // Secret validations to sign the token for emails and jwt
    JWT_EXPIRY: Joi.string()
        .required()
        .description("JWT Expiry required for token generation"),
    JWT_SECRET: Joi.string()
        .required()
        .description("JWT Secret required for token generation"),

    RESET_PASSWORD_SECRET: Joi.string()
        .required()
        .description("Reset Password Secret required to generate token"),
    RESET_PASSWORD_EXPIRY: Joi.string()
        .required()
        .description("Reset Password expiry time required"),

    EMAIL_CONFIRMATION_SECRET: Joi.string()
        .required()
        .description("Email Confirmation Secret required to generate token"),
    EMAIL_CONFIRMATION_EXPIRY: Joi.string()
        .required()
        .description("Email Confirmation expiry time required"),

    // Validate the Url to redirect to on social login and verification/password reset.
    // FRONTEND_URL: Joi.string().required().description('Frontend Url required for social auth')
})
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
    throw new Error(
        Logs.customError(`Config validation error: ${error.message}`),
    );
}

export const ENV = {
    env: envVars.NODE_ENV,
    appVersion: envVars.APP_VERSION,

    port: envVars.SERVER_PORT,
    host: envVars.SERVER_HOST,

    mongoUrl: envVars.MONGO_DB_URI,

    emailHost: envVars.EMAIL_HOST,
    emailPort: envVars.EMAIL_PORT,
    emailUser: envVars.EMAIL_USER,
    emailPass: envVars.EMAIL_PASS,
    emailSecure: envVars.EMAIL_SECURE,

    jwtSecret: envVars.JWT_SECRET,
    jwtExpiry: envVars.JWT_EXPIRY,

    resetPasswordSecret: envVars.RESET_PASSWORD_SECRET,
    resetPasswordExpiry: envVars.RESET_PASSWORD_EXPIRY,

    emailConfirmationSecret: envVars.EMAIL_CONFIRMATION_SECRET,
    emailConfirmationExpiry: envVars.EMAIL_CONFIRMATION_EXPIRY,
};
