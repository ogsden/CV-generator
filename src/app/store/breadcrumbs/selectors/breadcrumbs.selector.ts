import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBreadcrumbState } from '../state/breadcrumb.state';

export const state = createFeatureSelector<IBreadcrumbState>('breadcrumbs');

export const getBreadcrumbs = createSelector(
  state,
  (state) => state.breadcrumbs
);
