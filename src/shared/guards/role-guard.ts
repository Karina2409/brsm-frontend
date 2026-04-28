import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth';

export const roleGuard = (roles: string[]): CanActivateFn => {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if (!authService.isAuthenticated()) {
            router.navigate(['/login']);
            return false;
        }

        const user = authService.getUser();

        if (roles.includes(user.role)) {
            return true;
        }

        if (user.role === 'STUDENT') {
            router.navigate(['/main']);
        } else if (user.role === 'SECRETARY' || user.role === 'CHIEF_SECRETARY') {
            router.navigate(['/students']);
        }

        return false;
    };
};
