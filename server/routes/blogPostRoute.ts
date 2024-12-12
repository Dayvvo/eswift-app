import { Router } from "express";
import blogPostController from "../controllers/blogPostController";
import { isAdmin, isAuth } from "../utils/middleware";

const router = Router();

router.post("/post", isAuth, blogPostController.createBlogPost);
router.put("/post/:blogPostId", isAuth, isAdmin, blogPostController.updatePost);
router.get("/post", blogPostController.fetchBlogPost);
router.get("/post/:blogPostId", blogPostController.fetchBlogPostById);
router.delete(
  "/delete-post/:blogPostId",
  isAuth,
  isAdmin,
  blogPostController.deleteBlogPost
);

export default router;
