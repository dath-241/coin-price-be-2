export enum Role {
    VIP0 = 0,
    VIP1 = 1,
    VIP2 = 2,
    VIP3 = 3,
  }
  

  



  //Admin controller
export type removeUserPayload = {
  username: string;
};

export type DetailUserInfo = {
  name: string;
  email: string;
  username: string;
  password: string;
  vip_role: Role;
  ip_list: string[][];
  coin: number | null;
  otp: {
    otpCode: string;
    expiryDate: string;
    expired: boolean;
  };
  telegram_id: string;
};

//Auth
export type SignupPayload = {
  name: string;
  username: string;
  email: string;
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

//User
export type BasicUserInfo = {
  name: string;
  username: string;
  email: string;
  vipRole: number;
  coin: number | null;
};
export type ForgotPasswordPayload = { email: string };
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