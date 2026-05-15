export interface EventForStudent {
    eventId: number;
    name: string;
    date: string | Date;
    time: string | Date;
    place: string;
    studentCount: number;
    studentsRegistered: number;
    optCount: number;
    forPetition: boolean;
}
