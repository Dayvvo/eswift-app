import mongoose from "mongoose";

const Profile = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    homeAddress: { type: String, required: true },
    officeAddress: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    isExistingCustomer: { type: Boolean, required: true },
    contactMethod: { type: String, required: true },
    idType: { type: String, required: true },
    idDocument: {
      type: String,
      required: true,
    },
    agendIdDocument: { type: String, required: true },
    uploadedPassport: { type: String, required: true },
    occupation: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", Profile);
