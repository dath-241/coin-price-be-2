import axios, { AxiosResponse } from "axios";
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

export const BackEndBaseURL = "https://dath.hcmutssps.id.vn";

const headerWithToken = (token: string) => {
  return {
    withCredentials: true,
    "Content-Type": "application/json",
    Cookie: `token=${token}`,
  };
};
const headers = {
  withCredentials: true,
  "Content-Type": "application/json",
};

function processResponseFromAPIRoute(response: AxiosResponse<any, any>) {
  return {
    success: response.status === 200,
    message: response.data.message,
    data: response.data.data,
    status: response.status,
  } as CustomResponse<null>;
}

function processResponseFromAPIServer(error: any) {
  return {
    success: false,
    message: error.response.data.message,
    data: null,
    status: error.status,
  } as CustomResponse<null>;
}

function processError(error: any) {
  return {
    success: false,
    message: error.response.data.message,
    data: null,
    status: error.status,
  } as CustomResponse<null>;
}

// Auth Operation
export class AuthOperation {
  constructor() {}

  // Call from client
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
      return processError(error);
    }
  }

  // Call from client
  public async signinWithUsername(payload: SigninWithUsernamePayload) {
    const url = `${BackEndBaseURL}/auth/login`;
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
      return processError(error);
    }
  }

  // Call from server
  public async signup(payload: SignupPayload) {
    const url = `/api/auth/register`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return processResponseFromAPIRoute(response);
    } catch (error: any) {
      console.log(error);
      return processError(error);
    }
  }

  // Call from client
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
      return processError(error);
    }
  }

  // Call from client
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
      return processError(error);
    }
  }

  // Call from server
  public async forgotPassword(payload: ForgotPasswordPayload) {
    const url = `/api/auth/forgotPassword`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return processResponseFromAPIRoute(response);
    } catch (error: any) {
      console.log(error);
      return processError(error);
    }
  }

  // Call from server
  public async resetPassword(payload: ResetPasswordPayload) {
    const url = `/api/auth/resetPassword`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return processResponseFromAPIRoute(response);
    } catch (error: any) {
      console.log(error);
      return processError(error);
    }
  }
}

// User Operation
export class UserOperation {
  constructor() {}

  // Call from server component
  public async getUserInfoFromServer(token: string) {
    const url = `${BackEndBaseURL}/api/info`;
    try {
      const response = await axios.get(url, {
        headers: headerWithToken(token),
      });
      return {
        success: response.status === 200,
        message: "Get user info successfully",
        data: response.data,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);
      return processError(error);
    }
  }

  // Call from server
  public async changePassword(payload: ChangePasswordPayload) {
    const url = `/api/user/changePassword`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return processResponseFromAPIRoute(response);
    } catch (error: any) {
      console.log(error);
      return processError(error);
    }
  }

  // Call from server
  public async changeEmail(payload: ChangeEmailPayload) {
    const url = `/api/user/changeEmail`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return processResponseFromAPIRoute(response);
    } catch (error: any) {
      console.log(error);
      return processError(error);
    }
  }

  public async depositCoin(payload: DepositCoinPayload) {
    const url = `/api/user/depositCoin`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return processResponseFromAPIRoute(response);
    } catch (error: any) {
      console.log(error);
      return processError(error);
    }
  }

  public async purchaseVIP(payload: PurchaseVIPPayload) {
    const url = `/api/user/purchaseVIP`;
    try {
      const response = await axios.post(url, payload, { headers: headers });
      return processResponseFromAPIRoute(response);
    } catch (error: any) {
      console.log(error);
      return processError(error);
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