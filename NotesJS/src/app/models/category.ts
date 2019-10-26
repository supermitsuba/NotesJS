import { User } from './user';

export class Category {
    id: string;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
    user: User;
}