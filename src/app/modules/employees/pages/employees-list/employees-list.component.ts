import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EMPLOYEE_COLUMNS } from 'src/app/shared/constants/employees-columns';
import {
  EMPLOYEES_ROUTE,
  EMPLOYEE_CREATE_ROUTE,
  EMPLOYEE_EDIT_ROUTE,
} from 'src/app/shared/constants/route-config';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IEmployee } from 'src/app/shared/interfaces/employees.interface';
import { addBreadcrumb } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';
import { loadEmployees } from 'src/app/store/employees/actions/employees.actions';
import {
  getEmployees,
  getEmployeesLoading,
} from 'src/app/store/employees/selectors/employees.selector';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  private employeesSub: Subscription;
  private loadingSub: Subscription;
  public employees: any[];
  public columns: IColumn[] = EMPLOYEE_COLUMNS;
  public employeeCreateRoute: string = EMPLOYEE_CREATE_ROUTE.fullPath;
  public loading: boolean = true;

  constructor(
    private store$: Store,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public navigate(employeeId: any): void {
    this.router.navigate([EMPLOYEE_EDIT_ROUTE.fullPath, employeeId]);
  }

  public ngOnInit(): void {
    this.getEmployees();
    this.setBreadcrumb();
  }

  private getEmployees(): void {
    this.employeesSub = this.store$
      .select(getEmployees)
      .subscribe((employees: IEmployee[]) => {
        this.employees = employees;
        this.cdr.markForCheck();
      });

    this.loadingSub = this.store$
      .select(getEmployeesLoading)
      .subscribe((loading: boolean) => {
        this.loading = loading;
        this.cdr.markForCheck();
      });
  }
  private setBreadcrumb() {
    this.store$.dispatch(
      addBreadcrumb({
        title: 'core.employees',
        url: EMPLOYEES_ROUTE.path,
        name: 'core.employees',
        description: 'employees.list',
      })
    );
    this.store$.dispatch(loadEmployees());
  }

  public ngOnDestroy(): void {
    if (this.employeesSub) {
      this.employeesSub.unsubscribe();
    }
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
}
