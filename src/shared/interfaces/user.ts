import {Role} from '@enums/role';

export interface User {
    userId: number;
    login: string;
    surname: string;
    name: string;
    patronymic: string;
    role: Role;
    lastLogin: string | null;
    groupNumber: string | null;
    faculty: string | null;
}
