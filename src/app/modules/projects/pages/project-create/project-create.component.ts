import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  PROJECTS_CREATE_ROUTE,
  PROJECTS_ROUTE,
} from 'src/app/shared/constants/route-config';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { addBreadcrumb } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';
import { saveProject } from 'src/app/store/projects/actions/projects.actions';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateComponent {
  constructor(private store$: Store) {}

  public saveProject(project: IProject): void {
    this.store$.dispatch(saveProject({ project: project }));
  }

  public ngOnInit(): void {
    this.store$.dispatch(
      addBreadcrumb({
        title: 'core.projects',
        url: PROJECTS_ROUTE.path,
        name: 'core.projects',
        description: 'projects.list',
      })
    );
    this.store$.dispatch(
      addBreadcrumb({
        title: 'projects.create',
        url: PROJECTS_CREATE_ROUTE.fullPath,
        name: 'core.projects',
        description: 'projects.create',
      })
    );
  }
}
