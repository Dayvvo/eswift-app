export interface LoginDto {
  email: string;
  password: string;
  captcha?: string;
  rememberMe?: boolean;
}

export enum UserType {
  Guest = "guest",
  Trainer = "trainer",
  Trainee = "trainee",
}

export interface UserRo {
  active: boolean;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  emailVerified?: boolean;
  userType?: UserType;
}

export interface CurrentUserRo {
  user: {
    id: number;
    accountId: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    alias: string;
    password: string;
    twoFaEnabled: boolean;
    hashedRt?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    createdAt: string;
    updatedAt: string;
  };
  currentAccount: Record<string,any>;
  accounts: Array<{
    name: string;
    alias: string;
    accountId: string;
    group: "owner" | "personal";
    role: "super-admin" | "manager" | "support" | "developer";
  }>;
  expiresIn?: string;
}

export interface LoginRo {
  userId: string;
  accountId?: string;
  expiresIn?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthRo extends UserRo {
  userId: string;
  accountId?: string;
  expiresIn?: string;
  token?: string;
  refreshToken?: string;
  exp?: string;
}
