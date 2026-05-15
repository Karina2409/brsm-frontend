import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const numberIdGuard: CanActivateFn = (route) => {
    const id = route.params['id'];
    const isNumber = !isNaN(Number(id));
    if (isNumber) return true;

    return inject(Router).createUrlTree(['/404']);
};
