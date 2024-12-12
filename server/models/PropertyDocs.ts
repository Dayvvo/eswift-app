import mongoose, { Schema } from 'mongoose'
import { PropertyDocuments } from '../utils/interfaces/types';
export interface IPropertyDocs extends Document {
    name: DocumentType;
    property: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    state: 'blank' | 'submitted' | 'reviewing' | 'accepted' | 'rejected',
    file: string
}

const PropertyDocs = new mongoose.Schema<IPropertyDocs>(
  {
    name: {
      type: String,
      enum: Object.values(PropertyDocuments),
    },
    property: {
      type: Schema.Types.ObjectId, //possibly a json string
      ref: 'property',
    },
    state:{
        type:String,
        default:'blank'
    },
    file:{
        type:String
    },
    user: {
        type: Schema.Types.ObjectId, //possibly a json string
        ref: 'user',
    },

  },
  { timestamps: true }
)

export default mongoose.model('propertydocs', PropertyDocs)
