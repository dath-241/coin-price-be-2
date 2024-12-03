export enum Role {
    VIP0 = 0,
    VIP1 = 1,
    VIP2 = 2,
    VIP3 = 3,
  }
  

  export const sampleUsers: DetailUserInfo[] = [
    {
      name: "Alice Nguyen",
      email: "alice.nguyen@example.com",
      username: "alice123",
      password: "securepassword1",
      vip_role: Role.VIP1,
      ip_list: [["192.168.1.1"], ["10.0.0.1"]],
      coin: 500,
      otp: {
        otpCode: "123456",
        expiryDate: new Date(Date.now() + 3600 * 1000).toISOString(), // Hết hạn sau 1 giờ
        expired: false,
      },
      telegram_id: "alice_telegram_01",
    },
    {
      name: "Bob Tran",
      email: "bob.tran@example.com",
      username: "bobtran",
      password: "securepassword2",
      vip_role: Role.VIP2,
      ip_list: [["192.168.2.2"], ["10.0.1.1"]],
      coin: 1000,
      otp: {
        otpCode: "654321",
        expiryDate: new Date(Date.now() + 7200 * 1000).toISOString(), // Hết hạn sau 2 giờ
        expired: false,
      },
      telegram_id: "bob_telegram_02",
    },
    {
      name: "Charlie Hoang",
      email: "charlie.hoang@example.com",
      username: "charlie_h",
      password: "securepassword3",
      vip_role: Role.VIP3,
      ip_list: [["192.168.3.3"], ["10.0.2.1"]],
      coin: 2000,
      otp: {
        otpCode: "111222",
        expiryDate: new Date(Date.now() + 1800 * 1000).toISOString(), // Hết hạn sau 30 phút
        expired: false,
      },
      telegram_id: "charlie_telegram_03",
    },
  ];




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