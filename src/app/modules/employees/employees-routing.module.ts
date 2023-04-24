import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EMPLOYEE_CREATE_ROUTE,
  EMPLOYEE_EDIT_ROUTE,
} from 'src/app/shared/constants/route-config';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';

const routes: Routes = [
  { path: '', component: EmployeesListComponent },
  { path: EMPLOYEE_CREATE_ROUTE.path, component: EmployeeCreateComponent },
  { path: EMPLOYEE_EDIT_ROUTE.path, component: EmployeeEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesRoutingModule {}
