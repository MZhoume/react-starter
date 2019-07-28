import { SerializableException } from './abstractions/serializable.exception';

export class HttpException extends SerializableException {
  constructor(public statusCode: number, message?: string) {
    super(message);
  }
}
