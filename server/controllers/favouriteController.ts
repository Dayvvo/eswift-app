import { Request, Response } from "express";
import FavouriteProperty from "../models/FavouriteProperty";
import Property from "../models/Property";
import { isValidObjectId } from "mongoose";

class FavouritePropertyController {
  addToFavourites = async (req: Request, res: Response) => {
    try {
      const userId = req.user as any;
      const propertyId = req.params.propertyId;
      if (!propertyId)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${propertyId} not found`,
        });

      // Check if the property exists in the Property schema
      const propertyExistsInSchema = await Property.findById(propertyId);
      if (!propertyExistsInSchema) {
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${propertyId} does not exist`,
        });
      }

      const propertyExistsInFavorites = await FavouriteProperty.findOne({
        user: userId._id,
        property: propertyId,
      });

      if (propertyExistsInFavorites) {
        return res.status(400).json({
          statusCode: 400,
          message: "Property is already part of favourites!",
        });
      }

      const favouriteProperty = new FavouriteProperty({
        user: userId?._id,
        property: propertyId,
      });

      await favouriteProperty.save();
      return res.status(201).json({
        statusCode: 201,
        data: favouriteProperty,
        message: "Added to the list of favourite properties",
      });
    } catch (error) {
      res.status(500).send("Failed to add favourite property");
    }
  };

  getAllFavouriteProperty = async (req: Request, res: Response) => {
    try {
      console.log("matching user", req?.user);
      const properties = await FavouriteProperty.find({
        user: req.user,
      }).populate("property");
      return res.status(200).json({
        statusCode: 200,
        message: "Favourite properties",
        data: properties,
      });
    } catch (error) {
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  removeFromFavouriteProperty = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id))
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid ObjectId",
        });

      const deleted = await FavouriteProperty.findByIdAndDelete(id);
      if (!deleted)
        return res.status(404).json({
          statusCode: 404,
          message: `Favourite property with id ${id} not found`,
        });
      return res.json({
        statusCode: 200,
        message: "Successfully removed from favourite properties",
      });
    } catch (error) {
      res.status(500).send("An Error ocurred removing favourite properties");
    }
  };
}

let favouritePropertyController = new FavouritePropertyController();
export default favouritePropertyController;
