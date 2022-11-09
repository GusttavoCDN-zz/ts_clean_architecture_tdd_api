import { IController, IHttpRequest, IHttpResponse } from '../../presentation/contracts';

export class LogControllerDecorator implements IController {
  private readonly _controller: IController;

  constructor(controller: IController) {
    this._controller = controller;
  }

  public handle = async (httpRequest: IHttpRequest): Promise<IHttpResponse> => {
    const httpResponse = await this._controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      console.log('test');
    }

    return httpResponse;
  };
}
