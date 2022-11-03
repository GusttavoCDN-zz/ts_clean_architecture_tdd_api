import { Request, Response } from 'express';
import { IHttpRequest, IHttpResponse } from '../../presentation/contracts';
import { IController } from '../../presentation/contracts/IController';

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    };

    const httpResponse: IHttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
