import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  EMPLOYEES_ROUTE,
  EMPLOYEE_EDIT_ROUTE,
} from 'src/app/shared/constants/route-config';
import { addBreadcrumb } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';
import {
  editEmployee,
  loadEmployees,
} from 'src/app/store/employees/actions/employees.actions';
import { getEmployeeById } from 'src/app/store/employees/selectors/employees.selector';
import { CvComponent } from '../../components/cv/cv.component';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditComponent implements OnInit, OnDestroy {
  @ViewChild(EmployeeFormComponent)
  employeeFormComponent: EmployeeFormComponent;
  @ViewChild(CvComponent) cvComponent: CvComponent;
  private employeeSubscription: Subscription;
  private readonly id: number;
  private title: string;
  public loading: boolean = true;

  constructor(
    private store$: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.employeeSubscription = this.store$
      .select(getEmployeeById(this.id))
      .subscribe((employee) => {
        if (!employee) {
          this.store$.dispatch(loadEmployees());
        } else {
          this.title = `${employee.firstName} ${employee.lastName}`;
          this.setBreadcrumb();
        }
        this.loading = false;
      });
  }

  private setBreadcrumb(): void {
    this.store$.dispatch(
      addBreadcrumb({
        title: 'core.employees',
        url: EMPLOYEES_ROUTE.path,
        name: 'core.employees',
        description: 'employees.list',
      })
    );
    this.store$.dispatch(
      addBreadcrumb({
        title: this.title,
        url: EMPLOYEE_EDIT_ROUTE.fullPath,
        name: 'core.employees',
        description: this.title,
      })
    );
  }

  public onSubmit(): void {
    const info = this.employeeFormComponent.getFormValue();
    if (this.employeeFormComponent.employeeForm.invalid) {
      return this.employeeFormComponent.employeeForm.markAllAsTouched();
    }
    const cv = this.cvComponent.collectCvData();
    const employee = { ...info, cvs: cv, id: this.id };
    this.store$.dispatch(editEmployee({ employee: employee }));
    this.router.navigate([EMPLOYEES_ROUTE.path]);
  }

  public cancel(): void {
    this.router.navigate([EMPLOYEES_ROUTE.path]);
  }

  public ngOnDestroy(): void {
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }
}
