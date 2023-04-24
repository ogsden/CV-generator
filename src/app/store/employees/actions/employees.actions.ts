import { createAction, props } from '@ngrx/store';
import { IEmployee } from 'src/app/shared/interfaces/employees.interface';

export const loadEmployees = createAction('[Employees] load employees');

export const employeesLoaded = createAction(
  '[Employees] employees loaded',
  props<{ employees: IEmployee[] }>()
);

export const saveEmployee = createAction(
  '[Employees] post employee',
  props<{ employee: IEmployee }>()
);

export const employeeSaved = createAction(
  '[Employees] employee posted',
  props<{ employee: IEmployee }>()
);

export const editEmployee = createAction(
  '[Employees] edit employee',
  props<{ employee: IEmployee }>()
);

export const employeeEdited = createAction(
  '[Employees] employee edited',
  props<{ employee: IEmployee }>()
);
