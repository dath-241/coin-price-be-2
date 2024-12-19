export enum Role {
  VIP0 = 0,
  VIP1 = 1,
  VIP2 = 2,
  VIP3 = 3,
}

//Info
export type BasicUserInfo = {
  name: string;
  email: string;
  username: string;
  coin: number;
  vip_role: Role;
};

//Auth
export type SignupPayload = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type SigninWithEmailPayload = {
  email: string;
  password: string;
};

export type SigninWithUsernamePayload = {
  username: string;
  password: string;
};

//User controller
export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  email: string;
  otp: string;
  newPassword: string;
};

export type ChangePasswordPayload = {
  newPassword: string;
};

export type ChangeEmailPayload = {
  email: string;
};

export type DepositCoinPayload = {
  amount: number;
};

export type PurchaseVIPPayload = {
  vipLevel: Role;
};
