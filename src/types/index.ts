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

export type PaymentHistory = {
  date: string;
  username: string;
  email: string;
  amount: number;
};
