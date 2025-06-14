import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.mjs";
import { jwtTokens } from "../utils/index.mjs";

/**
 *
 * @param {*} req
 * @returns User Object & token
 */
export const SignUp = async (req) => {
    const user = await User.createNew(req.body);
    return {
        message: "User created successfully",
        status: StatusCodes.CREATED,
        payload: user.toAuthJSON(),
    };
};

/**
 *
 * @param {*} req
 * @returns User Object & token
 */
export const SignIn = async (req) => {
    const { email, password } = req.body;
    const user = await User.findByIdentifier(email);

    if (!user) {
        throw new Error("User not exist with such email.");
    }

    if (!user.validPassword(password)) {
        throw new Error("Invalid credentials.");
    }
    return {
        message: "User logged in successfully.",
        payload: user.toAuthJSON(),
    };
};

/**
 *
 * @param {*} req
 * @returns success message
 */
export const forgotPassword = async (req) => {
    const { email } = req.body;
    const user = await User.findByIdentifier(email);

    if (!user) {
        throw new Error("User not exist with such email.");
    }
    // setup email sending and response back to user
    return {
        message: "Reset password email sent successfully.",
    };
};

/**
 *
 * @param {*} req
 * @returns success message
 */
export const resetPassword = async(req) => {
    const { token, password } = req.body;
    const decodedToken = jwtTokens.verifyEmailConfirmationToken(token);
    const user = await User.findById(decodedToken._id).exec();
    if (!user) {
        throw new Error("User not found.");
    }

    user.setPassword(password);
    await user.save();

    return {
        message: "Password reset successfully.",
    };
};
