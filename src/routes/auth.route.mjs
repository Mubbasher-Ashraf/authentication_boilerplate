import { Router } from "express";
import { authSchema } from "#validations";
import {authController} from "#controllers";
import { validateRequest, middlewareWrapper } from "#middlewares";

export const authRoutes = Router();


authRoutes
    .post("/signup",validateRequest(authSchema.signUp), middlewareWrapper(authController.SignUp))
    .post("/login", validateRequest(authSchema.signIn), middlewareWrapper(authController.SignIn))
    .post("/forgot-password", validateRequest(authSchema.forgotPassword), middlewareWrapper(authController.forgotPassword))
    .post("/reset-password", validateRequest(authSchema.resetPassword), middlewareWrapper(authController.resetPassword));
