import { Router } from "express";
import profileController from "../controllers/profileController";
import userController from "../controllers/userController";
import { hasAuth, isAdmin, isAuth } from "../utils/middleware";

const router = Router();

router.post("/profile", isAuth, profileController.createProfile);
router.put("/profile", isAuth, profileController.updateProfile);
router.get("/profile", isAuth, profileController.getProfileByUserId);
router.get("/users", hasAuth, userController.getAllUsers);
router.get("/users/:userId", userController.getUserById);
router.put("/users/:userId/verify", isAuth, isAdmin, userController.verifyUser);
router.post("/add-user", userController.addUser);

export default router;
