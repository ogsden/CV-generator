import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProjectsState } from '../state/projects.state';

export const state = createFeatureSelector<IProjectsState>('projects');

export const getProjects = createSelector(state, (state) => state.projects);

export const getProjectsLoading = createSelector(
  state,
  (state: IProjectsState) => state.loading
);

export const getProjectById = (projectId: number) =>
  createSelector(getProjects, (projects) =>
    projects.find((project) => project.id === projectId)
  );
