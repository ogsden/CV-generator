import { IRouteConfig } from '../interfaces/route-config.interface';

export const AUTH_ROUTE: IRouteConfig = {
  path: 'auth',
  fullPath: 'auth',
};

export const PROJECTS_ROUTE: IRouteConfig = {
  path: 'projects',
  fullPath: 'projects',
};

export const PROJECTS_CREATE_ROUTE: IRouteConfig = {
  path: 'create',
  fullPath: '/projects/create',
};

export const PROJECT_EDIT_ROUTE: IRouteConfig = {
  path: 'edit/:id',
  fullPath: '/projects/edit',
};

export const EMPLOYEES_ROUTE: IRouteConfig = {
  path: 'employees',
  fullPath: 'employees',
};

export const EMPLOYEE_CREATE_ROUTE: IRouteConfig = {
  path: 'create',
  fullPath: '/employees/create',
};

export const EMPLOYEE_EDIT_ROUTE: IRouteConfig = {
  path: 'edit/:id',
  fullPath: '/employees/edit',
};
