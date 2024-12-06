export type SpotPriceData = {
  symbol: string; // Example: "BTCUSDT"
  price: string; // Example: "10000.00"
  eventTime: string; // Example: "2024-10-18 22:21:00"
};

export type MarketCapData = {
  marketdata: {
    "market-cap": {
      usd: number; // Example: 1000000000
    };
    total_volume: {
      usd: number; // Example: 1000000000
    };
  };
};

export type FuturePriceData = {
  symbol: string; // Example: "BTCUSDT"
  price: string; // Example: "10000.00"
  eventTime: string; // Example: "2024-10-18 22:21:00"
};

export type FundingRateData = {
  symbol: string; // Example: "BTCUSDT"
  price: string; // Example: "10000.00"
  eventTime: string; // Example: "2024-10-18 22:21:00"
};

export type KlineData = {
  symbol: string; // Example: "BTCUSDT"
  eventTime: string; // Example: "2024-10-18 22:21:00"
  klineStartTime: string; // Example: "2024-10-18 22:21:00"
  klineCloseTime: string; // Example: "2024-10-18 22:21:00"
  openPrice: string; // Example: "10000.00"
  closePrice: string; // Example: "10000.00"
  highPrice: string; // Example: "10000.00"
  lowPrice: string; // Example: "10000.00"
  numberOfTrades: number; // Example: 100
  baseAssetVolume: string; // Example: "10000.00"
  takerBuyVolume: string; // Example: "10000.00"
  takerBuyBaseVolume: string; // Example: "10000.00"
  volume: string; // Example: "10000.00"
};
