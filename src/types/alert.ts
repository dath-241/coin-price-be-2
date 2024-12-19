type ObjectValue<T> = T[keyof T];

export const CONDITION = {
  GREATER_THAN: ">",
  LESS_THAN: "<",
  EQUAL: "=",
  GREATER_THAN_OR_EQUAL: ">=",
  LESS_THAN_OR_EQUAL: "<=",
} as const;
export type Condition = ObjectValue<typeof CONDITION>;

export const NOTIFICATION_METHOD = {
  EMAIL: "email",
  TELEGRAM: "telegram",
} as const;
export type NotificationMethod = ObjectValue<typeof NOTIFICATION_METHOD>;

export const INDICATOR = {
  EMA: "EMA",
  BOLL: "BOLL",
  MA: "MA",
} as const;
export type Indicator = ObjectValue<typeof INDICATOR>;

export const CONDITIONTYPE = {
  ONCE_IN_DURATION: "ONCE_IN_DURATION",
  REPEAT_N_TIMES: "REPEAT_N_TIMES",
  AT_SPECIFIC_TIME: "AT_SPECIFIC_TIME",
  FOREVER: "FOREVER",
  ONE_TIME: "ONE_TIME",
} as const;
export type ConditionType = ObjectValue<typeof CONDITIONTYPE>;

export const TRIGGERTYPE = {
  SPOT: "spot",
  FUTURE: "future",
  PRICE_DIFF: "price-difference",
  FUNDING_RATE: "funding-rate",
  INTERVAL: "interval",
  LISTING: "listing",
  INDICATOR: "indicator",
} as const;
export type TriggerType = ObjectValue<typeof TRIGGERTYPE>;

export type CreateSnoozePayload = {
  symbol: string;
  conditionType: ConditionType;
  startTime: string;
  endTime: string;
  triggerType: TriggerType;
};

export type CreateTriggerPayload = {
  symbol: string;
  condition: Condition;
  price: number;
  fundingRate: string;
  notification_method: NotificationMethod;
  triggerType: TriggerType;
};

export type CreateIndicatorTriggerPayload = {
  symbol: string;
  condition: Condition;
  price: number;
  indicators: Indicator;
  notification_method: NotificationMethod;
};

export type CreateUserIndicatorPayload = {
  name: string;
  code: string;
};

export type DeleteTriggerPayload = {
  symbol: string;
  triggerType: TriggerType;
};

export type DeleteIndicatorTriggerPayload = {
  symbol: string;
};

export type TriggerConditionData = {
  id: string;
  alert_id: string;
  username: string;
  symbol: string;
  condition: Condition;
  notification_method: NotificationMethod;
  spotPriceThreshold: number;
  triggerType: TriggerType;
};

export type IndicatorTrigerData = {
  id: string;
  alert_id: string;
  username: string;
  symbol: string;
  condition: Condition;
  notification_method: NotificationMethod;
  indicator: string | null;
  value: number;
  period: number;
  triggerType: TriggerType;
};
