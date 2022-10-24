import { IHttpResponse } from '../contracts/http.contract';
import { MissingParamError } from '../errors';

export const badRequest = (error: MissingParamError): IHttpResponse => ({
  statusCode: 400,
  body: error
});
