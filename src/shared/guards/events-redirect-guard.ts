import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth';
import { Role } from '@enums/role';

export const eventsRedirectGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const role = authService.getUser().role;

    if (state.url === '/events') {
        if (role === Role.SECRETARY || role === Role.CHIEF_SECRETARY) {
            router.navigate(['/events/all']);
            return false;
        }
    }

    return true;
};
