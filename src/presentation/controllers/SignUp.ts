export class SignUpController {
  public handle(httpRequest: unknown): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    };
  }
}
