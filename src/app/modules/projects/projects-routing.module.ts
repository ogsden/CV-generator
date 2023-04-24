import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  PROJECTS_CREATE_ROUTE,
  PROJECT_EDIT_ROUTE,
} from 'src/app/shared/constants/route-config';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';

const routes: Routes = [
  { path: '', component: ProjectsListComponent },
  { path: PROJECTS_CREATE_ROUTE.path, component: ProjectCreateComponent },
  { path: PROJECT_EDIT_ROUTE.path, component: ProjectEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
