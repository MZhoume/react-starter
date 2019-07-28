import {
  interfaces,
  BaseHttpController,
  HttpResponseMessage
} from 'inversify-express-utils';
import { CREATED } from 'http-status-codes';

export class CreatedResult implements interfaces.IHttpActionResult {
  constructor(private apiController: BaseHttpController) {}

  public async executeAsync(): Promise<HttpResponseMessage> {
    const response = new HttpResponseMessage(CREATED);
    return response;
  }
}
