import express from "express";
import propertyController from "../controllers/propertyController";
import { hasAuth, isAdmin, isAuth } from "../utils/middleware";
import favouritePropertyController from "../controllers/favouriteController";

const router = express.Router();

router
  .route("/")
  .post(isAuth, propertyController.createProperty)
  .get(hasAuth,propertyController.getCreatedProperties);

router
  .route("/favourite/:propertyId")
  .post(hasAuth, favouritePropertyController.addToFavourites);

router.get(
  "/favourite",
  isAuth,
  favouritePropertyController.getAllFavouriteProperty
);

router.delete(
  "/favourite/:id",
  favouritePropertyController.removeFromFavouriteProperty
);

router.get("/props", propertyController.getPropertyDocs);

router.get("/admin", propertyController.adminGetAllProperties);

router
  .route("/:id")
  .get(hasAuth, propertyController.getPropertyById)
  .patch(isAuth, propertyController.updateProperty)
  .delete(isAuth, isAdmin, propertyController.deleteProperty);

router.patch("/:id/freeze", isAuth, propertyController.isActiveSwitch);

router.put("/:id/verify", isAuth, isAdmin, propertyController.verifyProperty);

export default router;
