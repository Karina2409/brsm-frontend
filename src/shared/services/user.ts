import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '@interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/users';

    public getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    public changeRole(userId: number, role: string, force: boolean = false): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/${userId}?force=${force}`, { role });
    }
}
