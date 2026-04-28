import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '@interfaces/event';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private http = inject(HttpClient);

    private getApi() {
        return 'http://localhost:8080/events';
    }

    getAll(): Observable<Event[]> {
        return this.http.get<Event[]>(this.getApi());
    }

    getUpcoming(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.getApi()}/upcoming`);
    }

    getDeleted(): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.getApi()}/deleted`);
    }

    create(event: any): Observable<any> {
        return this.http.post(`${this.getApi()}/create`, event);
    }

    update(id: number, event: any): Observable<any> {
        return this.http.post(`${this.getApi()}/update/${id}`, event);
    }
}
