import { IHttpResponse } from '../contracts/IHttp';
import { MissingParamError } from '../errors';

export const badRequest = (error: MissingParamError): IHttpResponse => ({
  statusCode: 400,
  body: error
});
