import { controller, interfaces, httpGet } from 'inversify-express-utils';
import { HttpController } from '../common/http.controller';

@controller('/')
export class HomeController extends HttpController {
  @httpGet('')
  public home(): interfaces.IHttpActionResult {
    return this.ok({ hello: 'world' });
  }
}
