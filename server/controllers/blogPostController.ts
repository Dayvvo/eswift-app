import { Request, Response } from "express";
import BlogPost from "../models/BlogPost";
import { validateBlogPostData } from "../utils/validation";
import { IUserInRequest } from "../utils/interfaces";
import path from "path";
import fs from "fs";
import { google } from 'googleapis';
import dotenv from "dotenv";
dotenv.config();

class BlogPostController {

  private drive: any;

  constructor() {
    this.initializeGoogleDrive();
  };

  private async initializeGoogleDrive() {
    const oauth2Client = new google.auth.OAuth2(process.env["CLIENT_ID"], process.env["CLIENT_SECRET"], process.env["redirect_url"]);
    oauth2Client.setCredentials({refresh_token: process.env["GOOGLE_REFRESH_TOKEN"]})

    this.drive = google.drive({version: "v3", auth: oauth2Client});
  };

  private getDriveFileId(url: string) {
    const regex = /\/d\/([a-zA-Z0-9_-]+)|id=([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  
  private async deleteDriveFile(fileId: string): Promise<boolean> {
    console.log("fileId", fileId);
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
      return true;
    } catch (error) {
      console.error(" __ERROR FROM THE SERVER __ ", error);
      return false;
    }
  };
  createBlogPost = async (req: Request, res: Response) => {
    try {
      const { error, value } = validateBlogPostData(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
      const user = req.user as any;

      const blogPost = new BlogPost({ ...value, author: user?._id as string });

      await blogPost.save();
      return res.status(201).json({
        statusCode: 201,
        data: blogPost,
        message: "Blog post created",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to create blog post");
    }
  };

  updatePost = async (req: Request, res: Response) => {
    const { error, value } = validateBlogPostData(req.body);
    if (error) {
      return res.status(400).json(error.message);
    }
    try {
      const blog = await BlogPost.findById(req.params.blogPostId);
      if (!blog) {
        return res.status(404).json({
          statusCode: 404,
          message: "Blog post not found",
        });
      }

    // const stripUploadsPrefix = (img: string | undefined | null): string => {
    //   if (!img) return "";
    //   return img.replace(/^.*\/uploads\//, '');
    // };
    
    // let blogHeaderImage = stripUploadsPrefix(blog?.header_image);
    // let valueHeaderImage = stripUploadsPrefix(value.header_image);
    
    // if (blogHeaderImage && blogHeaderImage !== valueHeaderImage) {
    //   blogPostController.clearImage(blogHeaderImage); // clear by filename only
    // }

    //   let blogBodyImage = stripUploadsPrefix(blog.body_image);
    //   let valueBodyImage = stripUploadsPrefix(value.body_image);
      
    //   if (blogBodyImage && blogBodyImage !== valueBodyImage) {
    //     blogPostController.clearImage(blogBodyImage);
    //   }

    if (blog.header_image) {
      const existingHeaderImageId = this.getDriveFileId(blog.header_image);
      const newHeaderImageId = this.getDriveFileId(value.header_image);
      if (existingHeaderImageId && newHeaderImageId && existingHeaderImageId !== newHeaderImageId) {
        this.deleteDriveFile(existingHeaderImageId);
      }
    }

    if (blog.body_image) {
      const existingBodyImageId = this.getDriveFileId(blog.body_image);
      const newBodyImageId = this.getDriveFileId(value.body_image);
      if (existingBodyImageId && newBodyImageId && existingBodyImageId !== newBodyImageId) {
        this.deleteDriveFile(existingBodyImageId);
      }
    }

    // const existingHeaderImageId = this.getDriveFileId(blog.header_image)

      const blogPost = await BlogPost.findOneAndUpdate(
        { _id: req.params.blogPostId },
        { ...value },
        { new: true }
      );
      return res.status(200).json({
        statusCode: 200,
        message: "updated successfully",
        data: blogPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to update blog post");
    }
  };

  fetchBlogPost = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const keyword = req.query.keyword as string;
    const regex = new RegExp(keyword, "i");
    const POST_PER_PAGE = 50;
    const skip = (page - 1) * POST_PER_PAGE;
    try {
      const author = req.user;
      const findQuery = {
        $or: [{ title: regex }],
      };
      const totalPost = await BlogPost.find(findQuery).countDocuments();
      const blogpost = await BlogPost.find(findQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(POST_PER_PAGE);

        const modifiedBlogPosts = blogpost.map((post) => {
          const postObject = post.toObject();
    
          if (process.env.NODE_ENV === "production") {
            return postObject; // Return as is in production
          }
    
          return {
            ...postObject,
            header_image: post.header_image && !(post.header_image.startsWith('http') || post.header_image.startsWith('https'))
              ? `${process.env.BACKEND_URL}/uploads/${post.header_image}`
              : post.header_image,
            body_image: post.body_image && !(post.body_image.startsWith('http') || post.body_image.startsWith('https'))
              ? `${process.env.BACKEND_URL}/uploads/${post.body_image}`
              : post.body_image,
          };
        });
      return res.status(200).json({
        statusCode: 200,
        message: "fetched successfully",
        data: modifiedBlogPosts,
        totalBlogPost: totalPost,

        hasNextPage: POST_PER_PAGE * page < totalPost,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalPost / POST_PER_PAGE),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to fetch blog posts");
    }
  };

  fetchBlogPostById = async (req: Request, res: Response) => {
    try {
      const blogPostDetail = await BlogPost.findById(req.params.blogPostId);
     
      if(process.env.NODE_ENV !== "production") {
        if(blogPostDetail) {
          if(!blogPostDetail.header_image?.startsWith('http') && !blogPostDetail.header_image?.startsWith('https')) {
            blogPostDetail.header_image = `${process.env.BACKEND_URL}/uploads/${blogPostDetail.header_image}`;
          } else {
            blogPostDetail.header_image = blogPostDetail.header_image
          }
         if(!blogPostDetail.body_image?.startsWith('http') && !blogPostDetail.body_image?.startsWith('https')) {
          blogPostDetail.body_image = `${process.env.BACKEND_URL}/uploads/${blogPostDetail.body_image}`;
         } else {
          blogPostDetail.body_image = blogPostDetail.body_image
         }
        }
      }
      return res.status(200).json({
        message: "Fetched successfully",
        data: blogPostDetail,
        statusCode: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to fetch blog post details");
    }
  };

  deleteBlogPost = async (req: Request, res: Response) => {
    const { blogPostId } = req.params;
    try {
      const user = req.user as IUserInRequest;
      const blogpost = await BlogPost.findById(blogPostId);
      const deletedBlogpost = await BlogPost.deleteOne({
        _id: blogPostId,
      });

      if (deletedBlogpost.acknowledged) {

        if (blogpost?.header_image) {
          const headerImageId = this.getDriveFileId(blogpost.header_image)
          // blogPostController.clearImage(blogpost.header_image);
          if (headerImageId) this.deleteDriveFile(headerImageId);
        }
        
        if (blogpost?.body_image) {
          const bodyImageId = this.getDriveFileId(blogpost.body_image)
          // blogPostController.clearImage(blogpost.body_image);
          if (bodyImageId) this.deleteDriveFile(bodyImageId);
        }
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Deleted successfully",
        data: deletedBlogpost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
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

let blogPostController = new BlogPostController();

export default blogPostController;
