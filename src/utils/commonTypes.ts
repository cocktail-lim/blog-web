interface PostConfig<T> {
  api: string;
  method: 'post';
  data?: T;
}

interface GetOrDefaultConfig<T> {
  api: string;
  method?: 'get';
  params?: T;
}

export type RequestConfig<T> = PostConfig<T> | GetOrDefaultConfig<T>;

export interface RequestFunc<Request, Response> {
  (config: RequestConfig<Request>): Promise<Response>;
}
