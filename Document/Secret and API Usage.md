Tham khảo: Cách có thể quản lý secret:

### Secret và API trong file API Specs:
1. **Authentication (Xác thực)**: 
   - Các API sử dụng **Bearer Token** (JWT token) để xác thực người dùng. JWT token thường được tạo ra sau khi người dùng đăng nhập thành công và phải được bảo mật như một "secret". 
   -  Cần lưu giữ các **API-TOKEN**, **JWT secrets**, và các **API keys** từ các dịch vụ bên thứ ba như **Binance**, **CoinMarketCap**, và **CoinGecko**. Những secret này sẽ được sử dụng để kết nối và xác thực khi gọi các API tương ứng.
   
2. **Tích hợp các dịch vụ bên ngoài**:
   - Khi tích hợp **Binance API**, **CoinMarketCap API**, và **CoinGecko API**, mỗi dịch vụ sẽ yêu cầu một **API Key** hoặc token. Đây là các thông tin bí mật cần bảo vệ để tránh người khác sử dụng trái phép.
   - Những **API Key** này nên được lưu trữ trong môi trường an toàn như **biến môi trường** hoặc sử dụng một công cụ quản lý secret.

### Những gì nên làm với API và secret:
1. **Lưu trữ secret an toàn**:
   - **Không bao giờ lưu API key hoặc secret trong mã nguồn**. Lưu APIs trong biến môi trường hoặc sử dụng các dịch vụ quản lý secret như AWS Secrets Manager, HashiCorp Vault.
   
   Ví dụ, ta có thể đặt các secret trong file `.env`:
   ```bash
   BINANCE_API_KEY="your_binance_api_key"
   COINMARKETCAP_API_KEY="your_coinmarketcap_api_key"
   JWT_SECRET="your_jwt_secret"
   ```
   Sau đó, trong Go, ta có thể đọc chúng như sau:
   ```go
   apiKey := os.Getenv("BINANCE_API_KEY")
   ```

2. **Sử dụng secret trong quá trình xác thực**:
   - Khi người dùng đăng nhập, bạn có thể tạo một JWT token sử dụng **JWT secret** (một khóa bí mật) để mã hóa và xác thực. Sau đó, token này sẽ được gửi lại cho người dùng và yêu cầu trong các request tiếp theo thông qua header `Authorization: Bearer <API-TOKEN>`.

3. **Bảo mật API key khi gọi các dịch vụ bên thứ ba**:
   - Khi gọi các API từ Binance, CoinMarketCap, hay CoinGecko, bạn sẽ cần gửi **API key** trong phần header hoặc query. Điều này yêu cầu bảo vệ key này khỏi những người không có quyền truy cập.

Ví dụ, khi gọi API Binance:
```go
req, _ := http.NewRequest("GET", "https://api.binance.com/api/v3/ticker/price", nil)
req.Header.Set("X-MBX-APIKEY", os.Getenv("BINANCE_API_KEY"))
```

**secrets** đóng vai trò rất quan trọng trong việc bảo mật thông tin nhạy cảm và kết nối với các dịch vụ API bên ngoài. 
---
=> Cần quản lý chúng cẩn thận và không đưa vào mã nguồn.
---