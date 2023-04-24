import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EMPLOYEES_ROUTE,
  PROJECTS_ROUTE,
} from 'src/app/shared/constants/route-config';
import { CorePageComponent } from './pages/core-page/core-page.component';

const routes: Routes = [
  {
    path: '',
    component: CorePageComponent,
    children: [
      {
        path: PROJECTS_ROUTE.path,
        loadChildren: () =>
          import('../projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: EMPLOYEES_ROUTE.path,
        loadChildren: () =>
          import('../employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
      {
        path: '',
        redirectTo: EMPLOYEES_ROUTE.path,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
