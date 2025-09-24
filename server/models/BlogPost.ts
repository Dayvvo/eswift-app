import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    header_image: {
      type: String, //possibly a json string
      required: false,
    },
    introduction: {
      type: String, //possibly a json string
      required: true,
    },
    body: {
      type: String, //possibly a json string
      required: true,
    },
    conclusion: {
      type: String, //possibly a json string
      required: true,
    },
    body_image: {
      type: String, //possibly a json string
      required: false,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // tags: [
    //   {
    //     type: String,
    //     trim: true,
    //   },
    // ],
  },
  { timestamps: true }
);

// BlogPostSchema.index({createdAt: 1, title: 1})

BlogPostSchema.index({createdAt: -1})

export default mongoose.model("blogPost", BlogPostSchema);
