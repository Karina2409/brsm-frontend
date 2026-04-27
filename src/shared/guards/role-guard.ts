import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const roleGuard= (roles: string[]): CanActivateFn  => {
  return () => {
    const router = inject(Router);

    const userData = localStorage.getItem('user');

    if (!userData) {
      router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userData);

    if (roles.includes(user.role)) {
      return true;
    }

    if (user.role === 'STUDENT') {
      router.navigate(['/profile']);
    } else if (user.role === 'SECRETARY' || user.role === 'CHIEF_SECRETARY') {
      router.navigate(['/students']);
    }

    return false;
  };
};
