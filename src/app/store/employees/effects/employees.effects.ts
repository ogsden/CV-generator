import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { EmployeesService } from 'src/app/shared/services/employees.service';
import {
  editEmployee,
  employeeEdited,
  employeeSaved,
  employeesLoaded,
  loadEmployees,
  saveEmployee,
} from '../actions/employees.actions';

@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeesService: EmployeesService
  ) {}

  public loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      exhaustMap(() =>
        this.employeesService.getEmployees().pipe(
          map((response) => employeesLoaded({ employees: response })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public postEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveEmployee),
      exhaustMap((action) =>
        this.employeesService.postEmployee(action.employee).pipe(
          map((response) => employeeSaved({ employee: response })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public putEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editEmployee),
      exhaustMap((action) =>
        this.employeesService.putEmployee(action.employee).pipe(
          map((response) => employeeEdited(response)),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
