import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fullName: string;

  @Column()
  phoneNo: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  dateOfBirth: string;

  static async createUser(params: Partial<User>) {
    await this.getRepository().save(params);
  }
}
