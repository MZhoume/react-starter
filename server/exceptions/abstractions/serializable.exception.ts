export abstract class SerializableException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }

  public toJSON(): any {
    const json: any = {};
    Object.getOwnPropertyNames(this).forEach(
      p => p !== 'stack' && (json[p] = (this as any)[p])
    );

    return json;
  }
}
