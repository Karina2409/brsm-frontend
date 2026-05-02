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

    public findStudentsInfo(): Observable<AllStudents[]> {
        return this.http.get<AllStudents[]>(`${this.getApi()}/only-students`, {
            withCredentials: true
        });
    }
}
