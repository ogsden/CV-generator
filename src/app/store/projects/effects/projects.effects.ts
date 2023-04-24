import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import {
  editProject,
  loadProjects,
  projectEdited,
  projectSaved,
  projectsLoaded,
  saveProject,
} from '../actions/projects.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}

  public loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      exhaustMap(() =>
        this.projectsService.getProjects().pipe(
          map((response) => projectsLoaded({ projects: response })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public postProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveProject),
      exhaustMap((action) =>
        this.projectsService.postProject(action.project).pipe(
          map((response) => projectSaved({ project: response })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  public putProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProject),
      exhaustMap((action) =>
        this.projectsService.putProjects(action.project).pipe(
          map((response) => projectEdited(response)),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
