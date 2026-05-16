import {inject, Injectable} from '@angular/core';
import { AllStudents } from '@interfaces/all-students';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private readonly http = inject(HttpClient);
    private getApi() {
        return 'http://localhost:8080/students';
    }

    // GET /students/only-students
    public getOnlyStudents(): Observable<AllStudents[]> {
        return this.http.get<AllStudents[]>(`${this.getApi()}/only-students`, {
            withCredentials: true
        });
    }

    // GET /students
    public getAllStudentsAndSecretaries(): Observable<AllStudents[]> {
        return this.http.get<AllStudents[]>(this.getApi(), {
            withCredentials: true
        });
    }

    // GET /students/{studentId}
    public getById(studentId: number): Observable<AllStudents> {
        return this.http.get<AllStudents>(`${this.getApi()}/${studentId}`, {
            withCredentials: true
        });
    }

    // PUT /students/{studentId}
    public update(studentId: number, studentData: AllStudents): Observable<AllStudents> {
        return this.http.put<AllStudents>(`${this.getApi()}/${studentId}`, studentData, {
            withCredentials: true
        });
    }

    // GET /students/{studentId}/events
    public getStudentEvents(studentId: number): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.getApi()}/${studentId}/events`, {
            withCredentials: true
        });
    }
}
