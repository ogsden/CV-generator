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
import { PROJECT_COLUMNS } from 'src/app/shared/constants/project-columns';
import {
  PROJECTS_CREATE_ROUTE,
  PROJECTS_ROUTE,
  PROJECT_EDIT_ROUTE,
} from 'src/app/shared/constants/route-config';
import { IColumn } from 'src/app/shared/interfaces/column.interface';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { addBreadcrumb } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';
import { loadProjects } from 'src/app/store/projects/actions/projects.actions';
import {
  getProjects,
  getProjectsLoading,
} from 'src/app/store/projects/selectors/projects.selector';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  private projectsSub: Subscription;
  private loadingSub: Subscription;
  public projectCreateRoute: string = PROJECTS_CREATE_ROUTE.fullPath;
  public projects: IProject[];
  public readonly columns: IColumn[] = PROJECT_COLUMNS;
  public loading: boolean = true;

  constructor(
    private store$: Store,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public navigate(projectId: any): void {
    this.router.navigate([PROJECT_EDIT_ROUTE.fullPath, projectId]);
  }

  public ngOnInit(): void {
    this.store$.dispatch(loadProjects());

    this.projectsSub = this.store$
      .select(getProjects)
      .subscribe((projects: IProject[]) => {
        this.projects = projects;
        this.cdr.markForCheck();
      });

    this.loadingSub = this.store$
      .select(getProjectsLoading)
      .subscribe((loading: boolean) => {
        this.loading = loading;
        this.cdr.markForCheck();
      });
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.store$.dispatch(
      addBreadcrumb({
        title: 'core.projects',
        url: PROJECTS_ROUTE.path,
        name: 'core.projects',
        description: 'projects.list',
      })
    );
  }

  public ngOnDestroy(): void {
    if (this.projectsSub) {
      this.projectsSub.unsubscribe();
    }
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }
}
