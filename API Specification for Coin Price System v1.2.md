**API Specification** cho hệ thống quản lý cảnh báo giá coin, backend: Go, tích hợp dữ liệu từ **Binance API**, **CoinMarketCap API**, **CoinGecko API**, và **cổng thanh toán Momo** để nâng cấp VIP.

---

## **API Overview**

### Base URL: `/api/v1`

### **Authentication:**
- Sử dụng **API-TOKEN** để xác thực người dùng.
- Token sẽ được gửi trong header của các request: (Trừ các API xác thực nằm trong /auth/**)
  `Authorization: Bearer <API-TOKEN>`

---
# VIP System and Access Control
VIP-0: Chỉ có thể tra cứu giá Spot, Future and Fundingrate.

VIP-1: Có thể truy cập mọi chức năng của VIP-0 và tra cứu Kline.

VIP-2: Có thể truy cập mọi chức năng của VIP-0, VIP-1 và Set Alert.

VIP-3: Có thể truy cập mọi chức năng, bao gồm tùy chỉnh các chỉnh báo nâng cao (Advanced Indicators).

Error Handling:

Nếu một Patron cố truy cập vào một endpoint mà họ không có quyền, trả về lỗi **403 Forbidden**

---
# General VIP Access Rules: 

VIP-3: Có thể truy cập /api/v1/vip3/**, /api/v1/vip2/**, /api/v1/vip1/**, and /api/v1/**.

VIP-2: Có thể truy cập /api/v1/vip2/**, /api/v1/vip1/**, and /api/v1/**. Truy cập /api/v1/vip3/** bị cấm (Forbidden).

VIP-1: Có thể truy cập /api/v1/vip1/** and /api/v1/**. Truy cập /api/v1/vip2/** and /api/v1/vip3/** bị cấm (Forbidden).

VIP-0: Có thể truy cập /api/v1/**. Truy cập /api/v1/vip1/**, /api/v1/vip2/**, and /api/v1/vip3/** bị cấm (Forbidden).

---
## **1. Authentication API (Xác thực người dùng)**

### **1.1. Đăng ký tài khoản (Register)**
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Description**: Đăng ký người dùng mới.
- **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "message": "User registered successfully",
        "user_id": "string"
      }
      ```
    - **400 Bad Request**: Thông tin không hợp lệ. (Input validation failed)
    - **409 Conflict**: Nếu email đã tồn tại

---

### **1.2. Đăng nhập (Login)**
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Description**: Xác thực người dùng bằng cách xác minh thông tin đăng nhập của họ. User mới đăng nhập luôn có role mặc định là VIP-0, nâng cấp từ từ lên VIP-1, VIP-2, VIP-3.
- **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Login successful",
        "token": "JWT-token"
      }
      ```
    - **401 Unauthorized**: Nếu thông tin đăng nhập không đúng.

---

### **1.3. Đặt lại mật khẩu (Forgot Password)**
- **Method**: `POST`
- **Endpoint**: `/auth/forgot-password`
- **Description**: Gửi liên kết đặt lại mật khẩu qua email.
- **Request Body**:
    ```json
    {
      "email": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Password reset link sent to your email"
      }
      ```
    - **404 Not Found**: Nếu email không tồn tại.

---

### **1.4. Thay đổi mật khẩu (Change Password)**
- **Method**: `POST`
- **Endpoint**: `/auth/reset-password`
- **Description**: Cho phép người dùng đặt lại mật khẩu bằng token từ reset link.
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
    ```json
    {
      "token": "reset_token_here",
      "new_password": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Password changed successfully"
      }
      ```
    - **401 Unauthorized**: Nếu mật khẩu cũ không đúng.

---
### **1.5. Đăng xuất**
- **Method**: `POST`
- **Description**: Đăng xuất người dùng bằng cách vô hiệu hóa phiên của họ hoặc xóa JWT token.
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Logout successful"
      }
      ```
---
### **1.5. Refresh Token**
- **Method**: `POST`
- **Description**: Cho phép người dùng làm mới token xác thực trước khi token hết hạn.
- **Response**:
    - **200 OK**:
      ```json
      {
        "token": "new_jwt_token_here"
      }
      ```
---
## **2. Coin Market Data API (Dữ liệu thị trường coin)**

### **2.1. Lấy giá Spot thời gian thực**
- **Method**: `GET`
- **Endpoint**: `/api/v1/spot-price`
- **Description**: Lấy giá Spot cho các cặp coin thời gian thực từ **Binance API**.
- **Query Parameters**:
    - `symbol`: Ký hiệu của cặp coin (ví dụ: BTCUSDT, ETHUSDT).
- **Response**:
    - **200 OK**:
      ```json
      {
        "symbol": "BTCUSDT",
        "price": "63953.02000000",
        "eventTime": "2024-10-18 22:21:00"
      }
      ```
- **Access**:
    1. VIP-0: ✅

    2. VIP-1: ✅

    3. VIP-2: ✅

    4. VIP-3: ✅    

    - **404 Not Found**: Nếu cặp coin không tồn tại.
    - **403 Forbidden**: Nếu người dùng không có VIP truy cập.

---

### **2.2. Lấy giá Future thời gian thực**
- **Method**: `GET`
- **Endpoint**: `/api/v1/future-price`
- **Description**: Lấy giá Future cho các cặp coin thời gian thực từ **Binance API**.
- **Query Parameters**:
    - `symbol`: Ký hiệu của cặp coin (ví dụ: BTCUSDT, ETHUSDT).
- **Response**:
    - **200 OK**:
      ```json
      {
        "symbol": "BTCUSDT",
        "future_price": "54000.5000000",
        "eventTime": "2024-10-18 22:21:00"
      }
      ```
- **Access**:
    1. VIP-0: ✅

    2. VIP-1: ✅

    3. VIP-2: ✅
    
    4. VIP-3: ✅   

    - **404 Not Found**: Nếu cặp coin không tồn tại.
    - **403 Forbidden**: Nếu người dùng không có VIP truy cập.

---

### **2.3. Lấy Funding Rate**
- **Method**: `GET`
- **Endpoint**: `/api/v1/funding-rate`
- **Description**: Lấy Funding Rate cho các cặp coin từ **Binance API**.
- **Query Parameters**:
    - `symbol`: Ký hiệu của cặp coin (ví dụ: BTCUSDT, ETHUSDT).
- **Response**:
    - **200 OK**:
      ```json
      {
        "symbol": "BTCUSDT",
        "fundingRate": "-0.00015784",
        "fundingCountDown": "03:13:24",
        "eventTime": "2024-10-18 22:21:00",
        "adjustedFundingRateCap": "0.02000000",
        "adjustedFundingRateFloor": "-0.02000000",
        "fundingIntervalHours": 4

      }
      ```
- **Access**:
    1. VIP-0: ✅

    2. VIP-1: ✅

    3. VIP-2: ✅
    
    4. VIP-3: ✅  

    - **404 Not Found**: Nếu cặp coin không tồn tại.
    - **403 Forbidden**: Nếu người dùng không có VIP truy cập tính năng.

---
### **2.4. Lấy giá Kline**
- **Method**: `GET`
- **Endpoint**: `/api/v1/vip1/kline`
- **Description**: Cho phép Patron từ VIP-1 trở lên nghiên cứu giá Kline và biểu đồ (Charting)
- **Requrest Query Parameters**:
    - `symbol`: (string) Ký hiệu của cặp coin (ví dụ: BTCUSDT, ETHUSDT).
    - `interval`: (string) Time interval (vd., 1m, 5m, 1d).
- **Response**:
    - **200 OK**:
      ```json
      {
        "symbol": "BTCUSDT",
        "interval": "1d",
        "eventTime": "2024-10-18 22:21:00",
        "kline_data": [
          {
            "time": "2024-01-01T00:00:00Z", "open": 50000, "high": 51000, "low": 49000, "close": 50500, "volume": 1000
          },
          // ...
        ]

      }
      ```
- **Access**:
    1. VIP-0: ❌ `403 Forbidden`

    2. VIP-1: ✅

    3. VIP-2: ✅
    
    4. VIP-3: ✅  

    - **403 Forbidden**: Nếu người dùng VIP-0 cố truy cập tính năng.

---

## **3. Alert API (Cảnh báo giá) - VIP-2 hoặc cao hơn**

### **3.1. Tạo cảnh báo giá**
- **Method**: `POST`
- **Endpoint**: `/api/v1/vip2/alerts`
- **Description**: Cho phép người dùng từ VIP-2 trở lên có thể Set Alert cho Spot, Future Price và Funding Rate
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
    ```json
    {
      "symbol": "BTCUSDT",
      "price": "63953.02000000",
      "condition": ">=",
      "notification_method": "email" //or push, Telegram
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "message": "Alert created successfully",
        "alert_id": "string"
      }
      ```
- **Access**:
    1. VIP-0: ❌ `403 Forbidden`

    2. VIP-1: ❌ `403 Forbidden`

    3. VIP-2: ✅
    
    4. VIP-3: ✅  

    - **400 Bad Request**: Nếu thông tin không hợp lệ.
    - **403 Forbidden**: Nếu người dùng VIP-0 hoặc VIP0-1 cố truy cập tính năng.

---

### **3.2. Xem danh sách cảnh báo**
- **Method**: `GET`
- **Endpoint**: `/api/v1/vip2/alerts`
- **Description**: Lấy danh sách cảnh báo của người dùng từ VIP-2 trở lên.
- **Authorization**: Bearer Token (JWT)
- **Response**:
    - **200 OK**:
      ```json
      [
        {
          "alert_id": "string",
          "symbol": "BTCUSDT",
          "price": "63953.02000000",
          "condition": ">=",
          "is_active": true
        }
      ]
      ```

---

### **3.3. Xóa cảnh báo**
- **Method**: `DELETE`
- **Endpoint**: `/api/v1/vip2/alerts/{alert_id}`
- **Description**: Xóa cảnh báo giá theo `alert_id`.
- **Authorization**: Bearer Token (JWT)
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Alert deleted successfully"
      }
      ```
    - **404 Not Found**: Nếu cảnh báo không tồn tại.

---
### **3.4. Tra cứu những Symbols được thêm mới hoặc bị hủy niêm yết**
- **Method**: `GET`
- **Endpoint**: `/api/v1/vip2/symbol-alerts`
- **Description**: Cho phép người dùng VIP-2 trở lên xem cảnh báo các mã chứng khoán mới niêm yết hoặc đã hủy niêm yết.
- **Authorization**: Bearer Token (JWT)
- **Response**:
    ```json
    {
      "new_symbols": ["NEWCOIN", "COINX"],
      "delisted_symbols": ["OLDCOIN"]
    }
    ```
- **Access**:
    1. VIP-0: ❌ `403 Forbidden`

    2. VIP-1: ❌ `403 Forbidden`

    3. VIP-2: ✅
    
    4. VIP-3: ✅  

    - **403 Forbidden**: Nếu người dùng VIP-0 hoặc VIP-1 cố truy cập tính năng.
---
### **3.5. Set Alert những Symbols được thêm mới hoặc bị hủy niêm yết**
- **Method**: `POST`
- **Endpoint**: `/api/v1/vip2/alerts/symbol`
- **Description**: Cho phép người dùng VIP-2 trở lên set cảnh báo các mã chứng khoán mới niêm yết hoặc đã hủy niêm yết.
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
    ```json
    {
      "type": "new_listing", //or delisting
      "notification_method": "email", //push or Telegram
      "symbols": ["BTCUSDT", "ETHUSDT"],
      "frequency": "immediate" //daily or weekly
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "message": "Alert deleted successfully",
         "alert_id": "alert12345"
      }
      ```

      
- **Access**:
    1. VIP-0: ❌ `403 Forbidden`

    2. VIP-1: ❌ `403 Forbidden`

    3. VIP-2: ✅
    
    4. VIP-3: ✅  

    - **400 Bad Request**: Request body không hợp lệ hoặc thiếu trường.
    - **403 Forbidden**: Nếu người dùng VIP-0 hoặc VIP-1 cố truy cập tính năng.
    - **500 Internal Sever Error**: Lỗi khi sử lý request bên phía server.
  

---
## **4. Set Advanced Indicators API (Hiệu chỉnh nâng cao) - VIP-3 hoặc cao hơn**

### **4.1. Tạo cảnh báo giá**
- **Method**: `POST`
- **Endpoint**: `/api/v1/vip3/indicators`
- **Description**: Cho phép người dùng VIP-3 set các chỉ số nâng cao nhe EMA, Bollinger Bands, hoặc các chỉ số tùy ý trong dao diện code plugin.
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
    ```json
    {
      "symbol": "BTCUSDT",
      "indicator": "EMA", // or "BollingerBands", "Custom"
      "period": 14,       // or any other period for the indicator
      "notification_method": "email" //or push, Telegram
    }
    ```
- **Response**:
    - **201 Created**:
      ```json
      {
        "message": "Indicator created successfully",
        "alert_id": "string"
      }
      ```
- **Access**:
    1. VIP-0: ❌ `403 Forbidden`

    2. VIP-1: ❌ `403 Forbidden`

    3. VIP-2: ❌ `403 Forbidden`
    
    4. VIP-3: ✅  

    - **400 Bad Request**: Nếu thông tin không hợp lệ.
    - **403 Forbidden**: Nếu người dùng VIP-0, VIP-1 hoặc VIP0-2 cố truy cập tính năng.

---

## **5. Payment API (Thanh toán và nâng cấp VIP)**

### **5.1. Khởi tạo thanh toán nâng cấp VIP qua Momo**
- **Method**: `POST`
- **Endpoint**: `/api/v1/payment/vip-upgrade`
- **Description**: Khởi tạo thanh toán nâng cấp tài khoản lên VIP qua **Momo**.
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
    ```json
    {
      "amount": 100000,  // Số tiền cần thanh toán
      "vip_level": "VIP-1"  // Mức VIP muốn nâng cấp
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "payment_url": "https://momo.vn/...",
        "order_id": "string"
      }
      ```
    - **400 Bad Request**: Nếu thông tin không hợp lệ.

---

### **5.2. Xác nhận thanh toán VIP thành công**
- **Method**: `POST`
- **Endpoint**: `/api/v1/payment/confirm`
- **Description**: Xác nhận trạng thái thanh toán thành công từ **Momo**.
- **Request Body**:
    ```json
    {
      "order_id": "string",
      "transaction_status": "success"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "Payment confirmed and VIP level upgraded"
      }
      ```
    - **400 Bad Request**: Nếu trạng thái thanh toán không thành công.

---

## **6. User Management API (Quản lý tài khoản)**

### **6.1. Xem thông tin tài khoản**
- **Method**: `GET`
- **Endpoint**: `/api/v1/user/me`
- **Description**: Lấy thông tin tài khoản người dùng hiện tại.
- **Authorization**: Bearer Token (JWT)


- **Response**:
    - **200 OK**:
      ```json
      {
        "user_id": "string",
        "email": "user@example.com",
        "vip_level": "VIP-1",
        "created_at": "2024-01-01T12:00:00Z"
      }
      ```

---

### **6.2. Chỉnh sửa thông tin tài khoản**
- **Method**: `PUT`
- **Endpoint**: `/api/v1/user/me`
- **Description**: Chỉnh sửa thông tin tài khoản người dùng.
- **Authorization**: Bearer Token (JWT)
- **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string"
    }
    ```
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "User information updated successfully"
      }
      ```
    - **400 Bad Request**: Nếu thông tin không hợp lệ.

---

### **6.3. Xóa tài khoản**
- **Method**: `DELETE`
- **Endpoint**: `/api/v1/user/me`
- **Description**: Xóa tài khoản người dùng hiện tại.
- **Authorization**: Bearer Token (JWT)
- **Response**:
    - **200 OK**:
      ```json
      {
        "message": "User account deleted successfully"
      }
      ```

---

## **7. Admin API (Quản trị hệ thống)**

### **7.1. Quản lý người dùng**
- **Method**: `GET`
- **Endpoint**: `/api/v1/admin/users`
- **Description**: Xem danh sách tất cả người dùng (Admin only).
- **Authorization**: Bearer Token (Admin JWT)
- **Response**:
    - **200 OK**:
      ```json
      [
        {
          "user_id": "string",
          "email": "user@example.com",
          "vip_level": "VIP-1",
          "status": "active"
        }
      ]
      ```

---
**Documentation and Error Handling**
---
**Common Responses**

`200 OK`: Thao tác thành công.

`201 Created`: Tài nguyên được tạo thành công.

`204 No Content`: Thao tác thành công, không có nội dung trả về.

`400 Bad Request`: Dữ liệu không hợp lệ hoặc thiếu thông tin.

`401 Unauthorized`: Người dùng không được phép truy cập tài nguyên.

`404 Not Found`: Tài nguyên không tìm thấy.

`500 Internal Server Error`: Lỗi không xác định trên server.

**Security Considerations**

HTTPS: Tất cả các endpoint đều cần phải được bảo mật qua HTTPS.

Rate Limiting: Cần áp dụng rate limiting để ngăn chặn việc lạm dụng API.

Validation: Tất cả dữ liệu đầu vào cần được xác thực để tránh SQL Injection hoặc XSS.

---