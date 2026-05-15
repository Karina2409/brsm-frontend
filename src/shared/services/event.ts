import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '@interfaces/event';
import {StudentFullName} from '@interfaces/student-full-name';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private http = inject(HttpClient);

    private getApi() {
        return 'http://localhost:8080/events';
    }

    // GET /events
    getAll(): Observable<Event[]> {
        return this.http.get<Event[]>(this.getApi());
    }

    // GET /events/{eventId}
    getById(eventId: string) {
        return this.http.get<Event>(`${this.getApi()}/${eventId}`);
    }

    // GET /events/upcoming
    getUpcoming(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.getApi()}/upcoming`);
    }

    // GET /events/past
    getPast(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.getApi()}/past`);
    }

    // TODO: добавить метод на бэк в контроллер (получение удаленных мероприятий)
    getDeleted(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.getApi()}/deleted`);
    }

    // POST /events
    create(event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.getApi()}`, event);
    }

    // PUT /events/{eventId}
    update(id: number, event: Event): Observable<Event> {
        return this.http.post<Event>(`${this.getApi()}/${id}`, event);
    }

    // DELETE /events/{eventId}
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.getApi()}/${id}`);
    }

    // GET /events/{eventId}/students
    getParticipants(id: string) {
        return this.http.get<StudentFullName[]>(`${this.getApi()}/${id}/students`);
    }
}
