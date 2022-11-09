import { ILogErrorRepository } from '../../data/contracts/ILogErrorRepository';
import { IController, IHttpRequest, IHttpResponse } from '../../presentation/contracts';

export class LogControllerDecorator implements IController {
  private readonly _controller: IController;
  private readonly _logErrorRepository: ILogErrorRepository;

  constructor(controller: IController, logErrorRepository: ILogErrorRepository) {
    this._controller = controller;
    this._logErrorRepository = logErrorRepository;
  }

  public handle = async (httpRequest: IHttpRequest): Promise<IHttpResponse> => {
    const httpResponse = await this._controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      await this._logErrorRepository.log(httpResponse.body.stack);
    }

    return httpResponse;
  };
}
