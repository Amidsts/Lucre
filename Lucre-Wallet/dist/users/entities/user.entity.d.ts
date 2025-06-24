import { BaseEntity } from 'typeorm';
export default class User extends BaseEntity {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    phoneNo: string;
    email: string;
    address: string;
    dateOfBirth: string;
    static createUser(params: Partial<User>): Promise<void>;
}
