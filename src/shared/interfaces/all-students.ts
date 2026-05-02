import {FacultyEnum} from '@enums/faculty';

export type AllStudents = {
    studentId: number;
    surname: string;
    name: string;
    patronymic: string;
    photo: null;
    groupNumber: string;
    faculty: FacultyEnum;
    eventsCount: number;
    brsmMember: boolean;
    dormitoryResidence: boolean;
    dormBlockNumber?: string;
    dormNumber?: number;
    phoneNumber?: string;
    telegramUsername?: string;
};
