import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
const authRouter = Router();


/**
 * POST /api/auth/register
 */
authRouter.post("/register", authController.register);

/**
 * POST /api/auth/login
 */
authRouter.post("/login", authController.login);


/**
 * GEt /api/auth/get-me
 */
authRouter.get("/get-me", authController.getMe)

/**
 * GEt /api/auth/refresh-token
 */
authRouter.get("/refresh-token", authController.refreshToken)

/**
 * GEt /api/auth/logout
 */
authRouter.get("/logout", authController.logout)

/**
 * GEt /api/auth/logout-all
 */
authRouter.get("/logout-all", authController.logoutAll)

/**
 * GEt /api/auth/verify-email
 */

// authRouter.get("/verify-email", authController.verifyEmail)
authRouter.post("/verify-email", authController.verifyEmail)


export default authRouter;