import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public email!: string;

  @Column()
  public passwordHash!: string;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;
}
