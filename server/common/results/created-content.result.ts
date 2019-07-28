import {
  interfaces,
  BaseHttpController,
  HttpResponseMessage,
  StringContent
} from 'inversify-express-utils';
import { CREATED } from 'http-status-codes';

export class CreatedContentResult<T> implements interfaces.IHttpActionResult {
  constructor(private content: T, private apiController: BaseHttpController) {}

  public async executeAsync(): Promise<HttpResponseMessage> {
    const response = new HttpResponseMessage(CREATED);
    response.content = new StringContent(
      JSON.stringify(this.content),
      'application/json'
    );
    return response;
  }
}
