import {
  BaseHttpController,
  results,
  HttpResponseMessage
} from 'inversify-express-utils';
import { NotFoundContentResult } from './results/not-found-content.result';
import { BadRequestContentResult } from './results/bad-request-content.result';
import { CreatedResult } from './results/created.result';
import { CreatedContentResult } from './results/created-content.result';
import { URL } from 'url';
import { UnauthorizedResult } from './results/unauthorized.result';

export interface IHttpActionResult {
  executeAsync(): Promise<HttpResponseMessage>;
}

export class HttpController extends BaseHttpController {
  protected created(): CreatedResult;
  protected created<T>(content: T): CreatedContentResult<T>;
  protected created<T>(
    location: string | URL,
    content: T
  ): results.CreatedNegotiatedContentResult<T>;
  protected created<T>(contentOrLocation?: T | string | URL, content?: T) {
    if (contentOrLocation === undefined) {
      return new CreatedResult(this as any);
    }

    if (content !== undefined) {
      return new results.CreatedNegotiatedContentResult(
        contentOrLocation as string | URL,
        content,
        this
      );
    }

    return new CreatedContentResult(contentOrLocation, this as any);
  }

  protected badRequest(): results.BadRequestResult;
  protected badRequest(message: string): results.BadRequestErrorMessageResult;
  protected badRequest<T>(content: T): BadRequestContentResult<T>;
  protected badRequest<T>(content?: string | T) {
    if (content === undefined) {
      return new results.BadRequestResult(this as any);
    }

    if (typeof content === 'string') {
      return new results.BadRequestErrorMessageResult(content, this as any);
    }

    return new BadRequestContentResult(content, this as any);
  }

  protected notFound(): results.NotFoundResult;
  protected notFound<T>(content: T): NotFoundContentResult<T>;
  protected notFound<T>(content?: T) {
    return content === undefined
      ? new results.NotFoundResult(this as any)
      : new NotFoundContentResult(content, this as any);
  }

  protected unauthorized(): UnauthorizedResult {
    return new UnauthorizedResult(this as any);
  }
}
