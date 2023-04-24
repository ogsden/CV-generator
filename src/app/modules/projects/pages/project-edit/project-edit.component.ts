import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  PROJECTS_ROUTE,
  PROJECT_EDIT_ROUTE,
} from 'src/app/shared/constants/route-config';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { addBreadcrumb } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';
import {
  editProject,
  loadProjects,
} from 'src/app/store/projects/actions/projects.actions';
import { getProjectById } from 'src/app/store/projects/selectors/projects.selector';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  private projectsSubscription: Subscription;
  private title: string;
  private readonly id: number;
  public loading: boolean = true;

  constructor(
    private store$: Store,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  public saveProject(project: IProject): void {
    const editedProject = {
      ...project,
      id: this.id,
    };
    this.store$.dispatch(editProject({ project: editedProject }));
  }

  public ngOnInit(): void {
    this.projectsSubscription = this.store$
      .select(getProjectById(this.id))
      .subscribe((project) => {
        if (!project) {
          this.store$.dispatch(loadProjects());
        } else {
          this.title = project.name;
          this.addBreadcrumbs();
          this.loading = false;
          this.cdr.markForCheck();
        }
      });
  }

  private addBreadcrumbs(): void {
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
        title: this.title,
        url: PROJECT_EDIT_ROUTE.fullPath,
        name: 'core.projects',
        description: 'projects.edit',
      })
    );
  }

  public ngOnDestroy(): void {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }
}
