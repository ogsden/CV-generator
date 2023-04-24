import { createReducer, on } from '@ngrx/store';
import {
  loadProjects,
  projectSaved,
  projectsLoaded,
} from '../actions/projects.actions';
import { projectsInitialState } from '../state/projects.state';

export const projectsReducer = createReducer(
  { ...projectsInitialState, loading: false },
  on(loadProjects, (state) => ({
    ...state,
    loading: true,
  })),
  on(projectsLoaded, (state, { projects }) => ({
    ...state,
    projects,
    loading: false,
  })),
  on(projectSaved, (state, result) => ({
    ...state,
    projects: [...state.projects, result.project],
  }))
);
