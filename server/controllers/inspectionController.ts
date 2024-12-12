import { Request, Response } from "express";
import InspectionSchema from "../models/Inspection";
import UserSchema from "../models/User";
import { fnRequest } from "../utils/interfaces/types";

export class InspectionController {
  public createInspection: fnRequest = async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      const user = await UserSchema.findOne({ email: payload.email });

      const newInspection = new InspectionSchema({
        ...payload,
        user: user ? user._id : null,
      });

      await newInspection.save();

      return res.status(201).json({
        message: "Inspection created successfully",
      });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({
        message: "An Error occurred creating this inspection",
        error: error.message || error,
      });
    }
  };

  public getAllInspections: fnRequest = async (req: Request, res: Response) => {
    try {
      const { per_page = 10, page = 1 } = req.params;

      const limit = parseInt(per_page as string, 10);
      const skip = (parseInt(page as string, 10) - 1) * limit;

      const inspections = await InspectionSchema.find()
        .skip(skip)
        .limit(limit)
        .exec();

      const userIds = inspections
        .filter((inspection) => inspection.user)
        .map((inspection) => inspection.user);

      const users = await UserSchema.find({
        _id: { $in: userIds },
      }).exec();

      const userMap = users.reduce((acc, user: any) => {
        acc[user._id] = user;
        return acc;
      }, {} as Record<string, any>);

      const inspectionsWithUserData = inspections.map((inspection: any) => {
        const inspectionObj = inspection.toObject();
        if (inspection.user && userMap[inspection.user]) {
          inspectionObj.user = userMap[inspection.user];
        }
        return inspectionObj;
      });
      const totalInspections = await InspectionSchema.countDocuments();

      res.status(200).json({
        message: "Inspections fetched successfully",
        inspections: inspectionsWithUserData,
        current_page: page,
        per_page: limit,
        total_pages: Math.ceil(totalInspections / limit),
        total: totalInspections,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error occurred fetching inspections",
        error: error?.message || error,
      });
    }
  };

  public deleteInspection: fnRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedInspection = InspectionSchema.findByIdAndDelete(id);

      if (!deletedInspection) {
        return res.status(404).json({
          message: "Inspection does not exist",
        });
      }

      return res.status(200).json({
        code: 200,
        message: "Inspection deleted successfully",
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Error occurred deleting inspection",
        error: error?.message || error,
      });
    }
  };
}

const inspectionController = new InspectionController();

export default inspectionController;
