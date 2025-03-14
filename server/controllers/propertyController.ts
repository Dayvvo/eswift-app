import { Request, Response } from "express";
import {
  ValidateAddProperty,
  ValidateEditProperty,
  validateLoginData,
} from "../utils/validation/index";
import Property from "../models/Property";
import { IUser, IUserInRequest } from "../utils/interfaces";
import { isValidObjectId, ObjectId } from "mongoose";
import PropertyDocs from "../models/PropertyDocs";
import Favourite from "../models/FavouriteProperty";

import mongoose from "mongoose";
import { HttpStatusCode } from "axios";
import User from "../models/User";
import { mailGenMails } from "../utils/mails/mailgen.mail";
import path from "path";
import fs from "fs";

class PropertyController {
  //TODO: finish function
  createProperty = async (req: Request, res: Response) => {
    const validate = ValidateAddProperty(req.body);
    const { value, error } = validate;

    if (error) {
      return res.status(400).json(error.details[0]);
    }
    const user = req.user! as any;
    try {
      if (!isValidObjectId(value.ownerID)) {
        return res
          .status(HttpStatusCode.BadRequest)
          .json({ message: `Invalid object Id` });
      }
      const newProperty = new Property({ creatorID: user["_id"], ...value });
      const locateInterest: any = [];
      const state = newProperty.state;
      locateInterest.push(state);
      let email;
      if (!state && !locateInterest.length) {
        email = [];
      }
      const query: any = {};
      const orConditions: any[] = [];
      if (state) {
        orConditions.push({ state: { $regex: state, $options: "i" } });
      }
      if (locateInterest.length) {
        orConditions.push({
          locationInterest: {
            $in: locateInterest.map(
              (interest: string) => new RegExp(interest, "i")
            ),
          },
        });
      }
      if (orConditions.length > 0) {
        query.$or = orConditions;
      }
      const users = await User.find(query);
      const emailData = users.map((user) => ({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      }));
      await newProperty.save();
      await mailGenMails.propertyCreationEmail(emailData);

      return res.status(HttpStatusCode.Created).json({
        statusCode: 200,
        message: "Property created",
        data: newProperty,
      });
    } catch (error: any) {
      return res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  updateProperty = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });
    const validate = ValidateEditProperty(req.body);
    const { value, error } = validate;

    if (error) {
      return res.status(400).json(error.details[0]);
    }

    try {
      const user = req.user as any;
      const ownerID = user._id;
      const property = await Property.findById(id);
      if (!property)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });

      const updatedProperty = await Property.findByIdAndUpdate(
        id,
        { ...value, ownerID: ownerID },
        { new: true }
      );

      return res.status(HttpStatusCode.Created).json({
        statusCode: 200,
        message: "Property created",
        data: updatedProperty,
      });
    } catch (error: any) {
      return res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  adminGetAllProperties = async (req: Request, res: Response) => {
    const pageSize = 60;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword as string;
    const regex = new RegExp(keyword, "i");

    const findQuery = {
      $or: [{ title: regex }, { description: regex }, { category: regex }],
    };

    try {
      const count = await Property.countDocuments(findQuery);
      const properties = await Property.find(findQuery)
        .populate({ path: "ownerID", select: "role firstName lastName" })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      const modifiedProperties = properties.map((property) => {
        if(process.env.NODE_ENV === "production") {
          return {...property.toObject()}
        }

       return {...property.toObject(),
        images: property.images
          ? property.images.map((img) =>
              img.startsWith("http")
                ? img
                : `${process.env.BACKEND_URL}/uploads/${img}`
            )
          : [],
      }});

      return res.status(200).json({
        statusCode: 200,
        message: "Property List",
        data: modifiedProperties,
        pagination: { page, pages: Math.ceil(count / pageSize), count },
      });
    } catch (err: any) {
      return res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  //TODO: finish function
  getCreatedProperties = async (req: Request, res: Response) => {
    const pageSize = 60;
    const page = Number(req.params.pageNumber) || 1;

    const keyword = req.query.keyword as string;

    const regex = new RegExp(keyword, "i");

    const findQuery = {
      $or: [{ title: regex }, { description: regex }, { category: regex }],
      isActive: true,
    };

    try {
      const count = await Property.countDocuments(findQuery);

      const user = req?.user as IUser;

      const matchingFavorites = await Favourite.find({
        ...(user
          ? {
              user: user._id,
            }
          : {}),
      })
        .select("property")
        .lean();

      const favoritePropertyIds = new Set(
        matchingFavorites.map((fav) => fav.property.toString())
      );

      const properties = await Property.find(findQuery)
        .lean()
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      return res.status(200).json({
        statusCode: 200,
        message: "Property List",
        data: properties.map((prop) => ({
          ...prop,
          isInFavorites: favoritePropertyIds.has(prop._id.toString()),
        })),
        pagination: { page, pages: Math.ceil(count / pageSize), count },
      });
    } catch (err: any) {
      console.error(err?.message);
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  getPropertyById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });

    const user = req.user as any;
    const userId = user?._id as string;
    let isInFavorites = false;
    try {
      const property = await Property.findById(id).lean();
      // Check if the property is in the user's favorites

      const existInFavourite = await Favourite.exists({
        user: userId,
        property: id,
      });

      if (!property)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });
      if (existInFavourite) {
        isInFavorites = true;
      }

      if(process.env.NODE_ENV !== "production") {
        if (property.images && Array.isArray(property.images)) {
          property.images = property.images.map((image) => {
            if (!image.startsWith("http")) {
              return `${process.env.BACKEND_URL}/uploads/${image}`;
            }
            return image;
          });
        }
  
        if (property.documents && Array.isArray(property.documents)) {
          property.documents = property.documents.map((docs) => {
            return {
              ...docs,
              document: docs.document.startsWith("http")
                ? docs.document
                : `${process.env.BACKEND_URL}/uploads${docs.document}`,
            };
          });
        }
      }

      return res.json({
        statusCode: 200,
        message: "Successful",
        data: { ...property, isInFavorites },
      });
    } catch (error: any) {
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  isActiveSwitch = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });

    try {
      const newProperty = await Property.findById(id);
      if (!newProperty)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });

      newProperty.isActive = !newProperty.isActive;
      newProperty.save();

      return res.json({
        statusCode: 200,
        message: `Property active switched from ${!newProperty.isActive} to ${
          newProperty.isActive
        }`,
      });
    } catch (error: any) {
      res.status(500).send("An Error ocurred while updating data");
    }
  };

  verifyProperty = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { verification } = req.body;
    const allowedVerificationStatuses = [
      "pending",
      "verified",
      "rejected",
      "suspend",
    ];
    if (!allowedVerificationStatuses.includes(verification)) {
      return res.status(400).json({ message: "Invalid verification status" });
    }

    try {
      const verifyStatus = await Property.findOneAndUpdate(
        { _id: id },
        { verification },
        { new: true }
      );

      if (!verifyStatus) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Verification status updated successfully",
        data: verifyStatus?.verification,
      });
    } catch (error) {
      res.status(500).send("An error occured while validation property");
    }
  };

  deleteProperty = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!isValidObjectId(id))
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId",
      });

    try {
      const property = await Property.findById(id);
      const deleted = await Property.deleteOne({ _id: id });
      if (!deleted)
        return res.status(404).json({
          statusCode: 404,
          message: `Property with id ${id} not found`,
        });

      if (deleted.acknowledged) {
        if (property?.images && property?.images.length > 0) {
          property.images.forEach((imagePath) => {
            propertyController.clearImage(imagePath);
          });
        }
      }

      if (property?.documents && property.documents.length > 0) {
        property.documents.forEach((doc) => {
          if (doc.document) {
            propertyController.clearImage(doc.document);
          }
        });
      }
      const user = req.user as IUserInRequest;
      await user?.decreasePropertyCount();
      return res.json({
        statusCode: 200,
        message: "Successful",
      });
    } catch (error: any) {
      console.error(error?.message);
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  getPropertyDocs = async (req: Request, res: Response) => {
    try {
      const propsDoc = await PropertyDocs.find();
      res.status(200).json({
        message: "success",
        data: propsDoc,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("An Error ocurred while retrieving data");
    }
  };

  clearImage = (filepath: string) => {
    if (!filepath) return;

    filepath =
      process.env.NODE_ENV === "production"
        ? `/mnt/volume/uploads/${filepath}`
        : path.join(__dirname, "..", "uploads", filepath);
    fs.unlink(filepath, (err) => {
      console.log(err);
    });
  };
}

let propertyController = new PropertyController();

export default propertyController;
