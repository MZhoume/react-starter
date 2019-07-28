import { controller, httpPost, requestBody } from 'inversify-express-utils';
import { hash, genSalt, compare } from 'bcrypt';
import {
  HttpController,
  IHttpActionResult
} from '../../common/http.controller';
import { DataService } from '../../services/data.service';
import { validatorFor } from '../../middleware/validator.middleware';
import {
  SignUpRequestModel,
  LogInRequestModel,
  SignUpResponseModel,
  LogInResponseModel
} from './models/user.models';

@controller('/user')
export class UserController extends HttpController {
  constructor(private dataService: DataService) {
    super();
  }

  @httpPost('/signup', validatorFor(SignUpRequestModel))
  public async signUp(
    @requestBody() model: SignUpRequestModel
  ): Promise<IHttpActionResult> {
    const user = {
      email: model.email,
      passwordHash: await hash(model.password, await genSalt()),
      firstName: model.firstName,
      lastName: model.lastName
    };

    const id = await this.dataService.createUser(user);
    return this.created<SignUpResponseModel>({ id });
  }

  @httpPost('/login', validatorFor(LogInRequestModel))
  public async logIn(
    @requestBody() model: LogInRequestModel
  ): Promise<IHttpActionResult> {
    const user = await this.dataService.readUserByEmail(model.email);
    if (!user) {
      return this.notFound();
    }

    if (!compare(model.password, user.passwordHash)) {
      return this.unauthorized();
    }

    return this.ok<LogInResponseModel>({
      id: user.id!,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }
}
