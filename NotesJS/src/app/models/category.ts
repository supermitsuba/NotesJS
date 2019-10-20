import { User } from './user';

export class Category {
    id: number;
    name: string;
    createdDate: Date;
    modifiedDate: Date;
    user: User;
}