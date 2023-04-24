import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  EMPLOYEES_ROUTE,
  EMPLOYEE_CREATE_ROUTE,
} from 'src/app/shared/constants/route-config';
import { addBreadcrumb } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';
import { saveEmployee } from 'src/app/store/employees/actions/employees.actions';
import { CvComponent } from '../../components/cv/cv.component';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeCreateComponent implements OnInit {
  @ViewChild(EmployeeFormComponent)
  employeeFormComponent: EmployeeFormComponent;
  @ViewChild(CvComponent) cvComponent: CvComponent;

  constructor(private store$: Store, private router: Router) {}

  ngOnInit(): void {
    this.setBreadcrumb();
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
        title: 'employees.create',
        url: EMPLOYEE_CREATE_ROUTE.fullPath,
        name: 'core.employees',
        description: 'employees.create',
      })
    );
  }

  public onSubmit(): void {
    const randomNumber = Math.random();
    const info = this.employeeFormComponent.getFormValue();
    if (this.employeeFormComponent.employeeForm.invalid) {
      return this.employeeFormComponent.employeeForm.markAllAsTouched();
    }
    const cv = this.cvComponent.collectCvData();
    const employee = {
      ...info,
      cvs: cv,
      username: `${randomNumber}`,
      password: `${randomNumber}`,
    };
    this.store$.dispatch(saveEmployee({ employee: employee }));
    this.router.navigate([EMPLOYEES_ROUTE.path]);
  }

  public cancel(): void {
    this.router.navigate([EMPLOYEES_ROUTE.path]);
  }
}
