import { Router } from "express";

import { authRoutes } from "./auth.route.mjs";
import { userRoutes } from "./user.route.mjs";
import { authenticate } from "#middlewares";

export const routes = Router();

/**
 * Server Health Check route
 */
routes.use("/health", (_, res) => {
  return res.render('health', { status: 'Server is healthy. Running successfully.' });
});

/** =================================================================
 *                Routes order matters
 *      request with params without prefix [eg: /:id]
 *      request with params with prefix  [eg: /user/:id]
 *      request with without params
 *      request with query params not matter
 * ==================================================================
 */

/**
 * All supported routes listing of server
 */
routes.use("/auth", authRoutes);
routes.use("/user", authenticate, userRoutes);