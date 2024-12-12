import mongoose, { Schema, model } from "mongoose";

export interface InspectionInterface {
  first_name: string;
  last_name: string;
  email: string;
  user: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
}

const InspectionSchema = new Schema<InspectionInterface>(
  {
    first_name: {
      type: String,
      require: [true, "Please enter your first name"],
    },
    last_name: {
      type: String,
      require: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      require: [true, "Please enter your email"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
  },
  { timestamps: true }
);

export default model("inspection", InspectionSchema);
