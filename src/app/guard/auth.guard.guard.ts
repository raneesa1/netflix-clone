import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { LoginServiceService } from '../services/login.service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginServiceService);
  const router = inject(Router);
  if (!loginService.isLoggedIn) {
    return router.createUrlTree(['/login']);
  } else {
    return true;
  }

};
