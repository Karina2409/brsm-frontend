export interface Event {
    eventId: number;
    name: string;
    date: string | Date;
    time: string | Date;
    place: string;
    studentCount: number;
    studentsRegistered: number;
    optCount: number;
    forPetition: boolean;
    createdAt: Date;
    createdBy: string;
}
