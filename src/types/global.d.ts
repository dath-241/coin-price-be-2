declare type SearchParams = {
  page?: number;
  field?: string;
  value?: string;
};

declare type CustomResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
