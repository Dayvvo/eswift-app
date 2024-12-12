import mongoose, { Schema } from 'mongoose'
import {
  PropertyDocuments,
  PropertyVerification,
} from '../utils/interfaces/types'
import { IProperty, PropertyOwner } from '../utils/interfaces'

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
})

const PropertySchema = new mongoose.Schema<IProperty>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    address: {
      type: String,
    },
    state:{
      type: String,
    },
    lga:{
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
      ref: 'user',
      required: true,
    },
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
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
  },
  { timestamps: true }
)

const Property = mongoose.model('property', PropertySchema)

export default Property
