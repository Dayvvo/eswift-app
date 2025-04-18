import express from "express";
import passport from "passport";
import authController from "../controllers/authController";
import { validateRequestMiddleware } from "../utils/middleware/request-validator.middleware";
import { changePasswordValidation, resetPasswordValidation, validateEmail } from "../utils/validation";
import { isAuth } from "../utils/middleware";

const router = express.Router();

router.get("/google", (req, res, next) => {
  const state = req.query["state"] as string;
  passport.authenticate("google", {
    scope: ["email", "profile"],
    ...(state ? { state } : {}),
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: `${process.env.BACKEND_URL}/login`,
  }),
  authController.googleAuthController
);

router.post("/login", authController.emailLoginAuthController);

router.put(
  "/reset",
  validateRequestMiddleware(resetPasswordValidation, "body"),
  authController.resetPassword
  // WatchAsyncController(inspectionController.createInspection)
);

router.post("/forgot-password", validateRequestMiddleware(validateEmail, "body") ,authController.sendTokenToEmail);
router.post('/change-password/:token', validateRequestMiddleware(changePasswordValidation, 'body'), authController.forgotPassword)

export default router;
