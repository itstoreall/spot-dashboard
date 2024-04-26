export enum Method {
  GET = 'GET',
  POST = 'POST'
}

export type RequestConfig = {
  method: Method;
  url: string;
};
