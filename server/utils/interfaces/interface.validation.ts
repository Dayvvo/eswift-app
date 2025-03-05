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
  features: Array<string>;
  images: Array<Express.Multer.File>;
  documents: Array<IDocument>;
  owner: string
}

export interface IDeleteFileValidation {
  url: string
}
