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

  public async getAllUser() {
    const url = `${BackEndBaseURL}/admin/getAllUser`;
    try {
      const response = await axios.get(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: response.data,
        status: response.status,
      } as CustomResponse<Array<{
        username: string;
        name: string;
        password: string;
        vip_role: number;
        ip_list: string[];
        coin: number;
        otp: {
          otpCode: string;
          expiryDate: string;
          expired: boolean;
        };
        telegram_id: string;
      }>>;
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

  public async getHistoryPayment(from: number, to: number) {
    const url = `${BackEndBaseURL}/admin/getHistoryPayment?from=${from}&to=${to}`;
    try {
      const response = await axios.get(url, { headers: headers });
      return {
        success: response.status === 200,
        message: response.data.message,
        data: response.data,
        status: response.status,
      } as CustomResponse<Array<{
        date: string;
        username: string;
        email: string;
        amount: number;
      }>>;
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }

  public async removeUserByUsername(username: string) {
    const url = `${BackEndBaseURL}/admin/removeUserByUsername?username=${username}`;
    try {
      const response = await axios.delete(url, { headers: headers });
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
        message: error.response?.data?.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }

  public async deleteAllUsername() {
    const url = `${BackEndBaseURL}/admin/deleteAllUsername`;
    try {
      const response = await axios.delete(url, { headers: headers });
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
        message: error.response?.data?.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }
}

// Coin price Operation
export class CoinPriceOperation {
  constructor() {}

  public async getSpotPrice(symbols: string[]) {
    const url = `${BackEndBaseURL}/api/get-spot-price?symbols=${symbols.join(",")}`;
    try {
      const response = await axios.get(url, { headers: headers });
  
      if (response.status === 200) {
        // Return the spot price data in case of success
        return {
          success: true,
          message: "Thành công!",  // Success message
          data: response.data,  // Data containing symbol, price, eventTime
          status: response.status,
        } as CustomResponse<{
          symbol: string;
          price: string;
          eventTime: string;
        }>;
      }
  
      // If the response status isn't 200, return failure
      return {
        success: false,
        message: "Unexpected response",
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      // Handle specific error responses
      if (error.response) {
        // Unauthorized (401) response
        if (error.response.status === 401) {
          return {
            success: false,
            message: error.response.data.message || "Phiên đăng nhập đã hết hạn",
            data: null,
            status: 401,
          } as CustomResponse<null>;
        }
  
        // Not found (404) response
        if (error.response.status === 404) {
          return {
            success: false,
            message: error.response.data.message || "404 Not Found",
            data: null,
            status: 404,
          } as CustomResponse<null>;
        }
      }
  
      // General error handling
      console.log(error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }
  

  public async getMarketCap(symbols: string[]) {
    const url = `${BackEndBaseURL}/api/get-marketcap?symbols=${symbols.join(",")}`;
    try {
      const response = await axios.get(url, { headers: headers });
  
      if (response.status === 200) {
        return {
          success: true,
          message: "Thành công!",
          data: response.data,
          status: response.status,
        } as CustomResponse<{
          marketdata: {
            "market-cap": {
              usd: number;
            };
            total_volume: {
              usd: number;
            };
          };
        }>;
      }
  
      return {
        success: false,
        message: "Unexpected response",
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          return {
            success: false,
            message: error.response.data.message || "Phiên đăng nhập đã hết hạn",
            data: null,
            status: 401,
          } as CustomResponse<null>;
        }
  
        if (error.response.status === 404) {
          return {
            success: false,
            message: error.response.data.message || "404 Not Found",
            data: null,
            status: 404,
          } as CustomResponse<null>;
        }
      }
  
      console.log(error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }
  

  public async getFuturePrice(symbols: string[]) {
    const url = `${BackEndBaseURL}/api/get-future-price?symbols=${symbols.join(",")}`;
    try {
      const response = await axios.get(url, { headers: headers });
  
      if (response.status === 200) {
        return {
          success: true,
          message: "Thành công!",
          data: response.data,
          status: response.status,
        } as CustomResponse<{
          symbol: string;
          price: string;
          eventTime: string;
        }>;
      }
  
      return {
        success: false,
        message: "Unexpected response",
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          return {
            success: false,
            message: error.response.data.message || "Phiên đăng nhập đã hết hạn",
            data: null,
            status: 401,
          } as CustomResponse<null>;
        }
  
        if (error.response.status === 404) {
          return {
            success: false,
            message: error.response.data.message || "404 Not Found",
            data: null,
            status: 404,
          } as CustomResponse<null>;
        }
      }
  
      console.log(error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }
  

  public async getFundingRate(symbols: string[]) {
    const url = `${BackEndBaseURL}/api/get-funding-rate?symbols=${symbols.join(",")}`;
    try {
      const response = await axios.get(url, { headers: headers });
  
      if (response.status === 200) {
        return {
          success: true,
          message: "Thành công!",
          data: response.data,
          status: response.status,
        } as CustomResponse<{
          symbol: string;
          price: string;
          eventTime: string;
        }>;
      }
  
      return {
        success: false,
        message: "Unexpected response",
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          return {
            success: false,
            message: error.response.data.message || "Phiên đăng nhập đã hết hạn",
            data: null,
            status: 401,
          } as CustomResponse<null>;
        }
  
        if (error.response.status === 404) {
          return {
            success: false,
            message: error.response.data.message || "404 Not Found",
            data: null,
            status: 404,
          } as CustomResponse<null>;
        }
      }
  
      console.log(error);
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }
  

  public async closeAllWebSockets() {
    const url = `${BackEndBaseURL}/api/close-all-web`;
    try {
      const response = await axios.delete(url, { headers: headers });
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

// Kline Operation
export class KlineOperation {
  constructor() {}

  public async getKline(symbol: string) {
    const url = `${BackEndBaseURL}/api/vip/get-kline?symbol=${symbol}`;
  
    try {
      const response = await axios.get(url, { headers: headers });
  
      if (response.status === 200) {
        return {
          success: true,
          message: response.data.message,
          data: response.data,
          status: response.status,
        } as CustomResponse<
          {
            symbol: string;
  eventTime: string;
  klineStartTime: string;
  klineCloseTime: string;
  openPrice: string;
  closePrice: string;
  highPrice: string;
  lowPrice: string;
  numberOfTrades: number;
  baseAssetVolume: string;
  takerBuyVolume: string;
  takerBuyBaseVolume: string;
  volume: string;
          }[]
        >;
      }
  
      return {
        success: false,
        message: response.data.message,
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return {
              success: false,
              message: error.response.data.message || "Phiên đăng nhập đã hết hạn",
              data: null,
              status: 401,
            } as CustomResponse<null>;
  
          case 403:
            return {
              success: false,
              message: error.response.data.message || "Vip role không đáp ứng yêu cầu truy cập api!",
              data: null,
              status: 403,
            } as CustomResponse<null>;
  
          case 404:
            return {
              success: false,
              message: error.response.data.message || "404 Not Found",
              data: null,
              status: 404,
            } as CustomResponse<null>;
  
          default:
            return {
              success: false,
              message: error.response.data.message || "Lỗi không xác định",
              data: null,
              status: error.response.status,
            } as CustomResponse<null>;
        }
      }
  
      console.error(error);
      return {
        success: false,
        message: error.message || "Lỗi hệ thống",
        data: null,
        status: 500,
      } as CustomResponse<null>;
    }
  }
  
}

// Indicator Operation
export class IndicatorOperation {
  constructor() {}

  public async getIndicator(
    symbols: string[],
    indicators: string[],
    days: number = 1
  ): Promise<CustomResponse<any>> {
    const url = `${BackEndBaseURL}/api/vip3/indicators`;
    try {
      const response = await axios.get(url, {
        params: {
          symbols: symbols.join(','),
          indicators: indicators.join(','),
          days,
        },
      });

      // Trả về phản hồi thành công
      return {
        success: response.status === 200,
        message: 'Lấy chỉ báo thành công.',
        data: response.data,
        status: response.status,
      } as CustomResponse<any>;
    } catch (error: any) {
      console.error(error);

      // Phân loại lỗi
      if (error.response) {
        const status = error.response.status;
        let message = 'Đã xảy ra lỗi không xác định.';

        switch (status) {
          case 401:
            message = 'Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.';
            break;
          case 403:
            message = 'Bạn không có quyền truy cập tài nguyên này.';
            break;
          case 404:
            message = 'Không tìm thấy tài nguyên (Symbols hoặc Indicator không tồn tại).';
            break;
          case 500:
            message = 'Lỗi khi thực thi script người dùng. Vui lòng thử lại sau.';
            break;
          default:
            message = error.response.data.message || 'Đã xảy ra lỗi không xác định.';
        }

        return {
          success: false,
          message: message,
          data: null,
          status: status,
        } as CustomResponse<any>;
      } else if (error.request) {
        // Không nhận được phản hồi từ server
        return {
          success: false,
          message: 'Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng.',
          data: null,
          status: 0,
        } as CustomResponse<any>;
      } else {
        // Lỗi trong quá trình chuẩn bị yêu cầu
        return {
          success: false,
          message: `Lỗi khi chuẩn bị yêu cầu: ${error.message}`,
          data: null,
          status: 0,
        } as CustomResponse<any>;
      }
    }
  }
}

// Snooze Operation
export class SnoozeOperation {
  constructor() {}

  public async createSnooze(payload: {
    snoozeType: string;
    symbol: string;
    conditionType: string;
    startTime: string;
    endTime: string;
  }) {
    const url = `${BackEndBaseURL}/api/vip2/create/snooze?snoozeType=${payload.snoozeType}`;
    try {
      const response = await axios.post(url, payload, { headers: headers });

      // Kiểm tra nếu response trả về thành công
      if (response.status === 200) {
        return {
          success: true,
          message: "Tạo điều kiện báo qua cảnh báo thành công",
          data: response.data,
          status: response.status,
        } as CustomResponse<null>;
      }

      return {
        success: false,
        message: "Lỗi không xác định",
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        // Kiểm tra lỗi 401: Chưa đăng nhập
        if (error.response.status === 401) {
          return {
            success: false,
            message: error.response.data.message || "Phiên đăng nhập đã hết hạn",
            data: null,
            status: 401,
          } as CustomResponse<null>;
        }

        // Kiểm tra lỗi 403: Bị chặn
        if (error.response.status === 403) {
          return {
            success: false,
            message: error.response.data.message || "Vip role không đáp ứng yêu cầu truy cập api!",
            data: null,
            status: 403,
          } as CustomResponse<null>;
        }
      }

      // Trường hợp lỗi không xác định
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }

  public async deleteSnooze(symbol: string, snoozeType: string) {
    const url = `${BackEndBaseURL}/api/vip2/delete/snooze/${symbol}?snoozeType=${snoozeType}`;
    try {
      const response = await axios.delete(url, { headers: headers });

      // Kiểm tra nếu response trả về thành công
      if (response.status === 200) {
        return {
          success: true,
          message: "Xóa điều kiện báo qua cảnh báo thành công",
          data: response.data,
          status: response.status,
        } as CustomResponse<null>;
      }

      return {
        success: false,
        message: "Lỗi không xác định",
        data: null,
        status: response.status,
      } as CustomResponse<null>;
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        // Kiểm tra lỗi 401: Chưa đăng nhập
        if (error.response.status === 401) {
          return {
            success: false,
            message: error.response.data.message || "Phiên đăng nhập đã hết hạn",
            data: null,
            status: 401,
          } as CustomResponse<null>;
        }

        // Kiểm tra lỗi 403: Bị chặn
        if (error.response.status === 403) {
          return {
            success: false,
            message: error.response.data.message || "Vip role không đáp ứng yêu cầu truy cập api!",
            data: null,
            status: 403,
          } as CustomResponse<null>;
        }

        // Kiểm tra lỗi 404: Không tìm thấy
        if (error.response.status === 404) {
          return {
            success: false,
            message: error.response.data.message || "404 Not Found",
            data: null,
            status: 404,
          } as CustomResponse<null>;
        }
      }

      // Trường hợp lỗi không xác định
      return {
        success: false,
        message: error.message || "Lỗi không xác định",
        data: null,
        status: error.response?.status || 500,
      } as CustomResponse<null>;
    }
  }
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