import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {AuthService} from '@services/auth';

@Component({
    selector: 'app-not-found-page',
    imports: [CommonModule, RouterModule, ButtonModule],
    templateUrl: './not-found-page.html',
    styleUrl: './not-found-page.scss',
})
export class NotFoundPage {
    private authService = inject(AuthService);
    private router = inject(Router);

    public goHome(): void {
        try {
            const user = this.authService.getUser();
            if (!user) {
                this.router.navigate(['/login']);
                return;
            }

            if (user.role === 'STUDENT') {
                this.router.navigate(['/main']);
            } else {
                this.router.navigate(['/students']);
            }
        } catch {
            this.router.navigate(['/login']);
        }
    }
}
