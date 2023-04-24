import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

export const canMatch: CanMatchFn = () => {
  return inject(PermissionsService).checkAuth();
};
