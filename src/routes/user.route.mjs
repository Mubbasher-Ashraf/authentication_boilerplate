import { Router } from "express";

import {userController} from "#controllers";
import { uploader, middlewareWrapper } from "#middlewares";

export const userRoutes = Router();

userRoutes
  .get("/profile", middlewareWrapper(userController.fetchUserDetails))
  .post("/logout", middlewareWrapper(userController.logout))
  .put("/profile", uploader, middlewareWrapper(userController.updateProfile));
