import { ObjectId } from "mongoose";

export enum UserRole {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  AFFILIATE = "AFFILIATE",
  AGENT = "AGENT",
  GUEST = "GUEST",
  STAFF = "STAFF",
}

export enum AuthProvider {
  GOOGLE = "google",
  EMAIL_SIGNUP = "email_signup",
}

export interface IUser {
  _id: ObjectId;
  tenantId?: string;
  email: string;
  avatar?: string;
  provider?: AuthProvider;
  lastName: string;
  firstName: string;
  refCode: string;
  refCount: number;
  hash?: string;
  propertyCount: number;
  role: UserRole;
  isActive: boolean;
  passwordUpdated: boolean;
  referrer: ObjectId;
  verification: "Pending" | "Verified" | "Rejected" | "Suspend" | "Resume";
  phoneNumber: string;
  address: string;
  matchPassword?: FunctionConstructor;
  increasePropertyCount?: FunctionConstructor;
  decreasePropertyCount?: FunctionConstructor;
  state?: string;
  propertyInterest?: string[];
  locationInterest?: string[];
  isExistingCustomer?: boolean;
  contactMethod?: string;
  idDocument?: string;
  agendIdDocument?: string;
  occupation: string;
  isOnboarded?: boolean;
}

export interface IUserInRequest extends IUser {
  matchPassword: FunctionConstructor;
  increasePropertyCount: FunctionConstructor;
  decreasePropertyCount: FunctionConstructor;
}
