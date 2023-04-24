import { createAction, props } from '@ngrx/store';
import { IProject } from 'src/app/shared/interfaces/project.interface';

export const loadProjects = createAction('[Projects] load projects');

export const projectsLoaded = createAction(
  '[Projects] projects loaded',
  props<{ projects: IProject[] }>()
);

export const saveProject = createAction(
  '[Projects] post project',
  props<{ project: IProject }>()
);

export const projectSaved = createAction(
  '[Projects] project posted',
  props<{ project: IProject }>()
);

export const editProject = createAction(
  '[Projects] edit project',
  props<{ project: IProject }>()
);

export const projectEdited = createAction(
  '[Projects] project edited',
  props<{ project: IProject }>()
);
