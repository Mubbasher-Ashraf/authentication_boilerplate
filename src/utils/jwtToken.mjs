import jwt from "jsonwebtoken";
import { ENV } from "../config/index.mjs";

/**
 * generate auth token
 * @param {*} body
 * @returns JWT token
 */
export const authToken = (body) =>
    jwt.sign(body, ENV.jwtSecret, { expiresIn: ENV.jwtExpiry });

/**
 * verify auth token
 * @param {*} body
 * @returns verified token
 */
export const verifyAuthtoken = (token) => jwt.verify(token, ENV.jwtSecret);

/**
 * generate reset password token
 * @param {*} body
 * @returns JWT token
 */
export const resetPasswordToken = (body) =>
    jwt.sign(body, ENV.resetPasswordSecret, {
        expiresIn: ENV.resetPasswordExpiry,
    });

/**
 * verify reset password token
 * @param {*} body
 * @returns verified token
 */
export const verifyResetPasswordToken = (token) =>
    jwt.verify(token, ENV.resetPasswordSecret);

/**
 * generate email confirmation token
 * @param {*} body
 * @returns JWT token
 */
export const emailConfirmationToken = (body) =>
    jwt.sign(body, ENV.emailConfirmationSecret, {
        expiresIn: ENV.emailConfirmationExpiry,
    });

/**
 * verify email confirmation token
 * @param {*} body
 * @returns verified token
 */
export const verifyEmailConfirmationToken = (token) =>
    jwt.verify(token, ENV.emailConfirmationSecret);
