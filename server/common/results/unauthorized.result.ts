import {
  interfaces,
  BaseHttpController,
  HttpResponseMessage
} from 'inversify-express-utils';
import { UNAUTHORIZED } from 'http-status-codes';

export class UnauthorizedResult implements interfaces.IHttpActionResult {
  constructor(private apiController: BaseHttpController) {}

  public async executeAsync(): Promise<HttpResponseMessage> {
    const response = new HttpResponseMessage(UNAUTHORIZED);
    return response;
  }
}
