import {
  interfaces,
  BaseHttpController,
  HttpResponseMessage,
  StringContent
} from 'inversify-express-utils';
import { NOT_FOUND } from 'http-status-codes';

export class NotFoundContentResult<T> implements interfaces.IHttpActionResult {
  constructor(private content: T, private apiController: BaseHttpController) {}

  public async executeAsync(): Promise<HttpResponseMessage> {
    const response = new HttpResponseMessage(NOT_FOUND);
    response.content = new StringContent(
      JSON.stringify(this.content),
      'application/json'
    );
    return response;
  }
}
