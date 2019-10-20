import { Category } from './category';
import { User } from './user';

export class Note {
    id: number;
    title: string;
    comment: string;
    category: Category;

    createdDate: Date;
    modifiedDate: Date;
    user: User;
}