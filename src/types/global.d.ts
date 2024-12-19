declare type CustomResponse<T> = {
  status: number;
  message: string;
  success: boolean;
  data: T;
};
