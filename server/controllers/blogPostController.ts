import { Request, Response } from "express";
import BlogPost from "../models/BlogPost";
import { validateBlogPostData } from "../utils/validation";
import { IUserInRequest } from "../utils/interfaces";
import path from "path";
import fs from "fs";

class BlogPostController {
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
    try {
      const { error, value } = validateBlogPostData(req.body);
      if (error) {
        return res.status(400).json(error.message);
      }
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
        .skip(skip)
        .limit(POST_PER_PAGE);

        const modifiedBlogPosts = blogpost.map((post) => {
          const postObject = post.toObject();
    
          if (process.env.NODE_ENV === "production") {
            return postObject; // Return as is in production
          }
    
          return {
            ...postObject,
            header_image: post.header_image
              ? `${process.env.BACKEND_URL}/uploads/${post.header_image}`
              : null,
            body_image: post.body_image
              ? `${process.env.BACKEND_URL}/uploads/${post.body_image}`
              : null,
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
          blogPostDetail.header_image = `${process.env.BACKEND_URL}/uploads/${blogPostDetail.header_image}`;
          blogPostDetail.body_image = `${process.env.BACKEND_URL}/uploads/${blogPostDetail.body_image}`;
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
        if (blogpost?.header_image)
          blogPostController.clearImage(blogpost.header_image);
        if (blogpost?.body_image)
          blogPostController.clearImage(blogpost.body_image);
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
