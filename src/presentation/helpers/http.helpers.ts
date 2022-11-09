import { IAddAccountDTO } from '../../domain/useCases/addAccount';
import { IHttpResponse } from '../contracts/IHttp';
import { MissingParamError, ServerError } from '../errors';

export const badRequest = (error: MissingParamError): IHttpResponse => ({
  statusCode: 400,
  body: error
});

export const serverError = (error: Error): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack as string)
  };
};

export const sucess = (data: IAddAccountDTO): IHttpResponse => ({
  statusCode: 200,
  body: data
});
