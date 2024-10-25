### **2.4. Lấy MarketCap và Volume**
- **Method**: `GET`
- **Endpoint**: `/api/v1/market-stats`
- **Description**: Lấy vốn hóa thị trường và khối lượng giao dịch từ **CoinMarketCap** hoặc **CoinGecko**.
- **Query Parameters**:
    - `symbol`: Ký hiệu của coin (ví dụ: BTC, ETH).
- **Response**:
    - **200 OK**:
      ```json
      {
        "symbol": "BTC",
        "market_cap": 1000000000,
        "24h_volume": 50000000
      }
      ```
    - **404 Not Found**: Nếu coin không tồn tại.

---