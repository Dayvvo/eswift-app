import { IDocument, UserRole } from "../interfaces";

export interface ILoginValidation {
  email: string;
  password: string;
}

export interface ISignupValidation {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber: string;
}

export interface IAddPropertyValidation {
  title: string;
  type: string;
  address: string;
  price: string;
  category: string;
  description: string;
  ownerID: string;
  features: Array<string>;
  images: Array<string>;
  documents: Array<IDocument>;
}

export interface IDeleteFileValidation {
  url: string
}
