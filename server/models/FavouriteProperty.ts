import mongoose, { Schema } from "mongoose";

interface FavouriteProps {
  property: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const FavouritPropertySchema = new mongoose.Schema<FavouriteProps>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("favouriteProperty", FavouritPropertySchema);
