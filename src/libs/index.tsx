import axios from "axios";
import {
  BasicUserInfo,
  ChangeEmailPayload,
  ChangePasswordPayload,
  DepositCoinPayload,
  ForgotPasswordPayload,
  PurchaseVIPPayload,
  ResetPasswordPayload,
  SigninWithEmailPayload,
  SigninWithUsernamePayload,
  SignupPayload,
} from "../types/user";

const BackEndBaseURL = "https://dath.hcmutssps.id.vn";
const basicHeader = {
  withCredentials: true,
  "Content-Type": "application/json",
};
const headerWithToken = (token: string) => {
  return {
    withCredentials: true,
    "Content-Type": "application/json",
    Cookie: `token=${token}`,
  };
};
const streamHeader = {};
const headers = basicHeader;

// Auth Operation
export class AuthOperation {
  constructor() {}

  public async signinWithEmail(payload: SigninWithEmailPayload) {
    const url = `${BackEndBaseURL}/auth/loginWithEmail`;
    try {
      const response = await axios.put(url, payload, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async signinWithUsername(payload: SigninWithUsernamePayload) {
    const url = `${BackEndBaseURL}/auth/login`;
    try {
      const response = await axios.put(url, payload, { headers: headers });
      console.log(response);
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async signup(payload: SignupPayload) {
    const url = `${BackEndBaseURL}/auth/register`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async signout() {
    const url = `${BackEndBaseURL}/auth/logOut`;
    try {
      const response = await axios.get(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async refreshToken() {
    const url = `${BackEndBaseURL}/auth/refreshToken`;
    try {
      const response = await axios.get(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async forgotPassword(payload: ForgotPasswordPayload) {
    const url = `${BackEndBaseURL}/auth/forgotPassword?email=${payload.email}`;
    try {
      const response = await axios.get(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async resetPassword(payload: ResetPasswordPayload) {
    const url = `${BackEndBaseURL}/auth/resetPassword?email=${payload.email}&otpCode=${payload.otp}`;
    const Newpayload = {
      newPassword: payload.newPassword,
    };
    try {
      const response = await axios.put(url, Newpayload, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }
}

// User Operation
export class UserOperation {
  constructor() {}

  public async getUserInfo() {
    const url = `${BackEndBaseURL}/api/info`;
    try {
      const response = await axios.get(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: response.data,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async getUserInfoFromServer(token: string) {
    const url = `${BackEndBaseURL}/api/info`;
    try {
      const response = await axios.get(url, {
        headers: headerWithToken(token),
      });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: response.data,
        status: response.status,
      } as CustomResponse<BasicUserInfo>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async changePassword(payload: ChangePasswordPayload) {
    const url = `${BackEndBaseURL}/api/changePassword`;
    try {
      const response = await axios.put(url, payload, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async changeEmail(payload: ChangeEmailPayload) {
    const url = `${BackEndBaseURL}/api/changeEmail?email=${payload.email}`;
    try {
      const response = await axios.put(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async depositCoin(payload: DepositCoinPayload) {
    const url = `${BackEndBaseURL}/api/deposit?amount=${payload.amount}`;
    try {
      const response = await axios.put(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }

  public async purchaseVIP(payload: PurchaseVIPPayload) {
    const url = `${BackEndBaseURL}/api/purchaseVIP?vipLevel=${payload.vipLevel}`;
    try {
      const response = await axios.put(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response.data.message,
        data: null,
        status: error.status,
      } as CustomResponse<null>;
    }
  }
}

// Admin Operation
export class AdminOperation {
  constructor() {}

  public async getAllUser() {}

  public async getHistoryPayment() {}

  public async removeUserByUsername() {}

  public async deleteAllUser() {}
}

// Coin price Operation
export class CoinPriceOperation {
  constructor() {}

  public async getSpotPrice() {}

  public async getMarketCap() {}

  public async getFuturePrice() {}

  public async getFundingRate() {}

  public async closeAllWebSocket() {}
}

// Kline Operation
export class KlineOperation {
  constructor() {}

  public async getKline() {}
}

// Indicator Operation
export class IndicatorOperation {
  constructor() {}

  public async getIndicator() {}
}

// Snooze Operation
export class SnoozeOperation {
  constructor() {}

  public async createSnooze() {}

  public async deleteSnooze() {}
}

// User's Indicator Operation
export class UserIndicatorOperation {
  constructor() {}

  public async createIndicator() {}
}

// Trigger Operation
export class TriggerOperation {
  constructor() {}

  public async getAlert() {}

  public async createTrigger() {}

  public async deleteTrigger() {}
}

// Indicator's Trigger Operation
export class IndicatorTriggerOperation {
  constructor() {}

  public async createTrigger() {}

  public async getAlert() {}

  public async deleteTrigger() {}
}