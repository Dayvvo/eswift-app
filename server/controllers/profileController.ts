import { Request, Response } from "express";
import Profile from "../models/User";
import { validateProfile } from "../utils/validation";
import { IUserInRequest } from "../utils/interfaces";
import { clearImage } from "../utils/helperFunctions/generateToken";
import path from "path";
import fs from "fs";

class ProfileController {
  createProfile = async (req: Request, res: Response) => {
    try {
      const { error, value } = validateProfile(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const user = req.user as IUserInRequest;
      const userId = user?._id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const existingProfile = await Profile.findOne({ userId });
      if (existingProfile) {
        return res.status(409).json({ message: "User profile already exists" });
      }

      const profileData = new Profile({ ...value, userId });
      await profileData.save();
      return res.status(201).json({
        statusCode: 201,
        data: profileData,
        message: "profile created",
      });
    } catch (error) {
      res.status(500).send("Failed to create profile");
    }
  };

  updateProfile = async (req: Request, res: Response) => {
    try {
      const { onboarding } = req.query;
      const { error, value } = validateProfile(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const user = req.user as IUserInRequest;
      const userId = user?._id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const selectedUser = await Profile.findById(userId)
      if(!selectedUser) {
        return res.status(404).json({
          statusCode: 404,
          message: 'User not find'
        })
      }
      const stripUploadsPrefix = (img: string | undefined | null): string => {
        if (!img) return "";
        return img.replace(/^.*\/uploads\//, '');
      };
    let profileImage = stripUploadsPrefix(selectedUser?.avatar);
    let valueProfileImage = stripUploadsPrefix(value.avatar);
  
    if(profileImage && profileImage !== valueProfileImage) {
      profileController.clearImage(profileImage); 
    }

      const userProfile = await Profile.findOneAndUpdate(
        { _id: userId },
        { ...value, ...(onboarding ? { isOnboarded: true } : {}) },
        { new: true }
      );

      if (!userProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      return res.status(201).json({
        statusCode: 201,
        data: userProfile,
        message: "profile updated",
      });
    } catch (error) {
      res.status(500).send("Failed to update profile");
    }
  };

  getProfileByUserId = async (req: Request, res: Response) => {
    try {
      const user = req.user as IUserInRequest;
      const userId = user?._id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userProfileData = await Profile.findById(userId);
      return res.status(200).json({
        statusCode: 200,
        data: userProfileData,
        message: "success",
      });
    } catch (error) {
      res.status(500).send("Failed get profile data");
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

let profileController = new ProfileController();

export default profileController;
