import { injectable } from 'inversify';
import { createConnection, Connection, Repository } from 'typeorm';
import { User } from '../data/entities/user.entity';

@injectable()
export class DataService {
  private connection!: Connection;

  private userRepo!: Repository<User>;

  constructor() {}

  public mapFrom<T>(entityType: new () => T, data: any): T {
    const entity = new entityType();
    Object.assign(entity, data);

    return entity;
  }

  public async init(): Promise<void> {
    this.connection = await createConnection();

    this.userRepo = this.connection.getRepository(User);
  }

  public readUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepo
      .createQueryBuilder('user')
      .where({ email })
      .getOne();
  }

  public async createUser(user: User): Promise<number> {
    await this.userRepo.save(user);

    return user.id!;
  }
}
