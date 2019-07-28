import {
  interfaces,
  BaseHttpController,
  HttpResponseMessage,
  StringContent
} from 'inversify-express-utils';
import { BAD_REQUEST } from 'http-status-codes';

export class BadRequestContentResult<T>
  implements interfaces.IHttpActionResult {
  constructor(private content: T, private apiController: BaseHttpController) {}

  public async executeAsync(): Promise<HttpResponseMessage> {
    const response = new HttpResponseMessage(BAD_REQUEST);
    response.content = new StringContent(
      JSON.stringify(this.content),
      'application/json'
    );
    return response;
  }
}
