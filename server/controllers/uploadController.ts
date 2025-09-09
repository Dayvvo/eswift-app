import { Request, Response } from "express";
import cloudinary from "../utils/config/cloudinary.config";
import { UploadApiResponse } from "cloudinary";
import { BUCKET_NAME, space } from "../utils/config/bucket.config";
import { randomBytes } from "crypto";
import {
  PutObjectRequest,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectRequest,
} from "@aws-sdk/client-s3";
import { validateDeleteFIle } from "../utils/validation";
import fs from "fs";
import path from "path";
import {  v4 as uuidv4} from "uuid";
import { google } from 'googleapis';
import  { Readable } from "stream";

// import dotenv from "dotenv";
import slugify from 'slugify';
// dotenv.config();

type StoreProps = {
  title: string;
  file: Express.Multer.File;
}
class UploadController {
  private drive: any;

  constructor() {
    this.initializeGoogleDrive();
  }

  private async initializeGoogleDrive() {
    const oauth2Client = new google.auth.OAuth2(process.env["CLIENT_ID"], process.env["CLIENT_SECRET"], process.env["redirect_uri"]);
    oauth2Client.setCredentials({refresh_token: process.env["GOOGLE_REFRESH_TOKEN"]});
    this.drive = google.drive({version: "v3", auth: oauth2Client});
  }
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file.path
      );
      return result.secure_url;
    } catch (error: any) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  //this uploads to digital ocean as opposed to cloudinary. All we have to do is replace uploadFile with uploadToDigital Ocean
  async uploadToDigitalOcean(file: Express.Multer.File): Promise<string> {
    const folderRoute =
      process.env.NODE_ENV === "production" ? "prod" : "uploads";

    const uploadParams: PutObjectRequest = {
      Bucket: BUCKET_NAME,
      ContentType: file.mimetype,
      Key: `${folderRoute}/${Date.now()}_${randomBytes(4).toString("hex")}.${
        file.mimetype.split("/")[1]
      }`,
      ACL: "public-read",
      Body: file.buffer as any,
    };
    try {
      const command = new PutObjectCommand(uploadParams);
      await space.send(command);

      //this has to be verified
      return `${process.env.DO_SPACES_ENDPOINT}/${BUCKET_NAME}/${uploadParams.Key}`;
    } catch (error: any) {
      console.error("Error uploading file:", error);
      throw new Error("Failed to upload file");
    }
  }

  async uploadToGoogleDrive(store: StoreProps) : Promise<string> {
    const { title, file } = store;
    const slugifyTitle = slugify(title, {lower: true});
    const randomString = uuidv4();
    const date = new Date().toISOString().replace(/[:.]/g, "-");
    const extension = file.originalname.split(".").pop();

    const fileName = `${slugifyTitle}-${randomString}-${date}.${extension}`;

    try {

      const folderId =
      file.mimetype === "application/pdf"
        ? process.env.GOOGLE_DRIVE_DOCUMENT_FOLDER_ID
        : process.env.GOOGLE_DRIVE_IMAGE_FOLDER_ID;
      
      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      const response = await this.drive.files.create({
        requestBody: {
          name: fileName,
          parents: [folderId]
        }, 
        media: {
          mimeType: file.mimetype,
          body: bufferStream
        }
      })

      const fileId = response.data.id;

      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone"
        }
      })

      if (file.mimetype === "application/pdf") {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      } else {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }

    } catch (error) {
      console.log("ERROR", error);
      throw new Error("Failed to upload file to Google Drive");
    }

  }

  // async uploadToRailway(file: Express.Multer.File): Promise<string> {
  //   try {
  //     const storagePath =
  //       process.env.NODE_ENV === "production"
  //         ? "/mnt/volume/uploads"
  //         : path.join(__dirname, "..", "uploads");

  //     if (!fs.existsSync(storagePath)) {
  //       fs.mkdirSync(storagePath, { recursive: true });
  //     }

  //     const fileName = `${Date.now()}_${file.originalname.replace(
  //       /\s+/g,
  //       "_"
  //     )}`;
  //     const filePath = path.join(storagePath, fileName);

  //     await fs.promises.writeFile(filePath, file.buffer as any);

  //     const fileUrl =
  //       process.env.NODE_ENV === "production"
  //         ? `${process.env.BACKEND_URL}/uploads/${fileName}`
  //         : `/${fileName}`.replace(/\\/g, "/");

  //     return fileUrl;
  //   } catch (error: any) {
  //     throw new Error("Failed to upload file");
  //   }
  // }
  async deleteFromDigitalOcean(publicUrl: string): Promise<void> {
    console.log("deleteCalled");
    try {
      const key = publicUrl.split(`${BUCKET_NAME}/`)[1];

      const deleteParams: DeleteObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: key,
      };

      const command = new DeleteObjectCommand(deleteParams);
      console.log({ res: await space.send(command) });
    } catch (error: any) {
      console.error("Error deleting file:", error);
      throw new Error("Failed to delete file");
    }
  }

  async deleteFile(req: Request, res: Response) {
    const validate = validateDeleteFIle(req.body);
    const { value, error } = validate;

    if (error) {
      return res.status(400).json(error.details[0]);
    }

    try {
      await uploadController.deleteFromDigitalOcean(value["url"]);
      return res.json({
        statusCode: 200,
        message: `Image deleted Successfully`,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: `Internal Server Error: ${error.message}`,
      });
    }
  }

  // async uploadSingle(req: Request, res: Response) {
  //   try {
  //     const file: Express.Multer.File | null = req.file ? req.file : null;
  //     if (!file) {
  //       return res
  //         .status(400)
  //         .json({ statusCode: 400, message: `Bad Request, No file selected` })
  //     };

  //     const secureUrl = await uploadController.uploadToRailway(file);

  //     return res.json({
  //       statusCode: 200,
  //       message: `Success`,
  //       data: secureUrl,
  //     })
  //   } catch (error: any) {
  //     return res.status(500).json({
  //       statusCode: 500,
  //       message: `Internal Server Error: ${error.message}`,
  //     })
  //   }
  // }

  async uploadSingle(req: Request, res: Response) {
    try {
      const file: Express.Multer.File | null = req.file ? req.file : null;
      const title = req.body.title;
     
      // if (!file) {
      //   return res
      //     .status(400)
      //     .json({ statusCode: 400, message: `Bad Request, No file selected` });
      // }

      const existing_image = req.body.file;

      if (existing_image && existing_image.startsWith("http")) {
        return res.status(200).json({
          message: "File already exists",
          statusCode: 200,
          image_url: existing_image,
        });
      } else {
        if (!file || !title) {
          return res
            .status(400)
            .json({ message: "title and image input must not be empty" });
        }

      const secureUrl = await uploadController.uploadToGoogleDrive({title, file});
      return res.json({
        statusCode: 200,
        message: "Success",
        data: secureUrl,
      });
      }
    } catch (error: any) {
      console.log("ERROR", error);
      return res.status(500).json({
        statusCode: 500,
        message: `Internal server error: ${error.message}`,
      });
    }
  }

  async uploadMultiple(req: Request, res: Response) {
    try {
      if (req.files && (req.files.length as number) > 1) {
        const files = req.files as Express.Multer.File[];
        const title = req.body.title;
        let urls: Array<string> = [];
        for (const file of files) {
          urls.push(await uploadController.uploadToGoogleDrive({title: title, file}));
        }

        return res.json({ statusCode: 200, message: `Success`, data: urls });
      } else {
        return res
          .status(400)
          .json({ statusCode: 400, message: "Bad Request, no files selected" });
      }
    } catch (error: any) {
      return res.status(500).json({
        statusCode: 500,
        message: `Internal Server Error: ${error.message}`,
      });
    }
  }
}

let uploadController = new UploadController();

export default uploadController;
