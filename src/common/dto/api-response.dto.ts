interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ApiResponseDto<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;

  constructor(
    success: boolean,
    message: string,
    data?: T,
    meta?: PaginationMeta,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
