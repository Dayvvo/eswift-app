import { Schema, model } from "mongoose";
import * as argon from "argon2";
import { AuthProvider, IUser, UserRole } from "../utils/interfaces";
import { generateRefCode } from "../utils/helperFunctions/generateRefCode";
import { UserVerification } from "../utils/interfaces/types";

const UserSchema = new Schema<IUser>(
  {
    tenantId: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: `https://res.cloudinary.com/dnpvndlmy/image/upload/v1724890974/user-3296_v28jnk.svg`,
    },
    provider: {
      type: String,
      enum: AuthProvider,
      default: AuthProvider.EMAIL_SIGNUP,
    },
    lastName: {
      type: String,
      lowercase: true,
    },
    hash: {
      type: String,
    },
    firstName: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      default: "",
      lowercase: true,
    },
    propertyCount: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.GUEST,
    },
    passwordUpdated: {
      type: Boolean,
      default: false,
      required: false,
    },

    referrer: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    refCode: {
      type: String,
    },

    refCount: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    verification: {
      type: String,
      enum: Object.values(UserVerification),
      default: UserVerification.Pending,
    },

    phoneNumber: {
      type: String,
      default: "",
    },
    state: {
      type: String,
    },

    propertyInterest: {
      type: [String],
    },
    locationInterest: {
      type: [String],
    },
    isExistingCustomer: { type: Boolean, required: false },
    contactMethod: { type: String, required: false },
    idDocument: {
      type: String,
      required: false,
    },
    agendIdDocument: { type: String, required: false },
    occupation: { type: String, required: false },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.increasePropertyCount = function () {
  let propsCount = this.propertyCount;
  propsCount += 1;
  this.propertyCount = propsCount;
  return this.save();
};
UserSchema.methods.decreasePropertyCount = function () {
  let propsCount = this.propertyCount;
  propsCount -= 1;
  this.propertyCount = propsCount;
  return this.save();
};

UserSchema.method("matchPassword", async function (enteredPassword) {
  const isMatch = await argon.verify(this.hash as string, enteredPassword);
  return isMatch;
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("hash")) {
    next();
  }
  this.hash = await argon.hash(this.hash as string);

  this.refCode = generateRefCode(8);
});

export default model("user", UserSchema);
