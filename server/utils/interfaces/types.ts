import { Request, Response, NextFunction } from "express";

export type generalRequestBody = Record<string, any>;

export enum PropertyDocuments {
  FAMILY_RECEIPT = "FamilyReceipt",
  SURVEY_PLAN = "SurveyPlan",
  LAYOUT = "Layout",
  AFFIDAVIT = "Affidavit",
  AGREEMENT = "Agreement",
  CERTIFICATE_OF_OCCUPANCY = "CofO",
  POWER_OF_ATTORNEY = "PowerOfAttorney",
  GOVERNMENT_CONSENT = "GovConsent",
}

export enum PropertyVerification {
  Pending = "Pending",
  Verified = "Verified",
  Rejected = "Rejected",
}
export enum UserVerification {
  Pending = "Pending",
  Verified = "Verified",
  Rejected = "Rejected",
  Suspend = "Suspend",
  Resume = "Resume",
}

export interface GoogleAuthResponse {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export type ExpressController = (
  req: Request,
  res: Response,
  next?: NextFunction
) => any;

export type fnRequest = (req: Request, res: Response) => Promise<any>;

export type uploadDestination = "property" | "user" | "blog";
