type Condition = ">=" | "<=" | ">" | "<" | "==";

export type Alert = {
  id: string;
  alert_id: string;
  username: string;
  symbol: string;
  condition: Condition;
  notification_method: string;
  spotPriceThreshold: number;
  triggerType: string;
};