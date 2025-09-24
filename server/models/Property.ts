import mongoose, { Schema } from "mongoose";
import {
  PropertyDocuments,
  PropertyType,
  PropertyVerification,
} from "../utils/interfaces/types";
import { IProperty, PropertyOwner } from "../utils/interfaces";

const DocumentSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(PropertyDocuments),
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
});

const PropertySchema = new mongoose.Schema<IProperty>(
  {
    title: {
      type: String,
      index: true,
    },
    description: {
      type: String,
      index: true,
    },
    category: {
      type: String,
      index: true,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    lga: {
      type: String,
    },
    features: {
      type: [String],
    },
    owner: {
      type: String,
      enum: PropertyOwner,
      default: PropertyOwner.ESWIFT,
    },
    price: {
      type: Object,
    },
    images: {
      type: [String],
    },
    creatorID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    documents: [DocumentSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    verification: {
      type: String,
      enum: Object.values(PropertyVerification),
      default: PropertyVerification.Pending,
    },
    isProject: {
      type: Boolean,
      default: false,
    },
    propertyType: {
      type: String,
      enum: Object.values(PropertyType),
      default: PropertyType.PROPERTY
    }
  },
  { timestamps: true }
);

PropertySchema.index({title: 1})

// PropertySchema.index({title: "text", description: "text", category: "text"})

const Property = mongoose.model("property", PropertySchema);

export default Property;
