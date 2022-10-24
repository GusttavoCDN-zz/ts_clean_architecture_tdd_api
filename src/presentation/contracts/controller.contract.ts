import { IHttpRequest, IHttpResponse } from './http.contract';

export interface IController {
  handle: (httpRequest: IHttpRequest) => IHttpResponse
}
