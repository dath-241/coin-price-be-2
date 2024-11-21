export enum Role {
    VIP0 = 0,
    VIP1 = 1,
    VIP2 = 2,
    VIP3 = 3,
  }
  
  export type User = {
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
  
  //Info
  type VIPROLE = { vipRole: Role };
  export type BasicUserInfo = Pick<User, "name" | "email" | "username" | "coin"> &
    VIPROLE;
  
  //Auth
  export type SignupPayload = Pick<
    User,
    "name" | "email" | "username" | "password"
  >;
  export type SigninWithEmailPayload = Pick<User, "email" | "password">;
  export type SigninWithUsernamePayload = Pick<User, "username" | "password">;
  
  //User controller
  export type ForgotPasswordPayload = Pick<User, "email">;
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
  
  //Admin controller
  export type removeUserPayload = Pick<User, "username">;