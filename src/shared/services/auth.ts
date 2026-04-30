import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '@interfaces/auth-response';
import { RefreshResponse } from '@interfaces/refresh-response';
import { Role } from '@enums/role';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);

    private API = 'http://localhost:8080/brsm/auth';

    login(login: string, password: string) {
        return this.http
            .post<AuthResponse>(`${this.API}/login`, { login, password })
            .pipe(tap((data) => this.saveUser(data)));
    }

    refresh(): Observable<RefreshResponse> {
        const user = this.getUser();

        return this.http.post<RefreshResponse>(`${this.API}/refresh`, {
            refreshToken: user?.refreshToken,
        });
    }

    logout() {
        const user = this.getUser();

        if (user?.token) {
            this.http
                .post(`${this.API}/logout`, {
                    refreshToken: user.refreshToken,
                })
                .subscribe({
                    complete: () => this.finishLogout(),
                    error: () => this.finishLogout(),
                });
        } else {
            this.finishLogout();
        }
    }

    getAccessToken(): string | null {
        return this.getUser()?.token || null;
    }

    setAccessToken(token: string) {
        const user = this.getUser();
        if (user) {
            user.token = token;
            this.saveUser(user);
        }
    }

    isAuthenticated(): boolean {
        const user = this.getUser();
        return !!(user?.token && user?.refreshToken);
    }

    isSecretary(): boolean {
        const role = this.getUser()?.role;
        return role === Role.SECRETARY;
    }

    isStudent(): boolean {
        const role = this.getUser()?.role;
        return role === Role.STUDENT;
    }

    isChiefSecretary(): boolean {
        const role = this.getUser()?.role;
        return role === Role.CHIEF_SECRETARY;
    }

    getUser(): AuthResponse {
        return JSON.parse(localStorage.getItem('user') || 'null');
    }

    private saveUser(user: AuthResponse) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    private clearUser() {
        localStorage.removeItem('user');
    }

    private finishLogout() {
        this.clearUser();
        this.router.navigate(['/login']);
    }
}
