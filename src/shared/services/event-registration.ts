import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EventRegistration {
    private http = inject(HttpClient);
    private readonly API_URL = 'http://localhost:8080/se';

    /**
     * Регистрация студента на мероприятие
     */
    registerStudent(studentId: number, eventId: number): Observable<void> {
        return this.http.post<void>(`${this.API_URL}/${studentId}/events/${eventId}`, {});
    }

    /**
     * Отмена регистрации
     */
    unregisterStudent(studentId: number, eventId: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/remove/student/${studentId}/event/${eventId}`);
    }

    /**
     * Получение ID мероприятий, на которые зарегистрирован студент
     */
    getRegisteredEventIds(studentId: number): Observable<number[]> {
        return this.http.get<number[]>(`http://localhost:8080/se/student/${studentId}/ids`);
    }
}
