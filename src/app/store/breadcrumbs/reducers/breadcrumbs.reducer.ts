import { createReducer, on } from '@ngrx/store';
import {
  addBreadcrumb,
  clearBreadcrumbs,
  updateBreadcrumbs,
} from '../actions/breadcrumbs.actions';
import { initialState } from '../state/breadcrumb.state';

export const breadcrumbReducer = createReducer(
  initialState,
  on(addBreadcrumb, (state, data) => {
    if (data.title === 'core.employees' || data.title === 'core.projects') {
      return {
        ...state,
        breadcrumbs: [...state.breadcrumbs.slice(0, 1), data],
      };
    } else {
      return { ...state, breadcrumbs: [...state.breadcrumbs, data] };
    }
  }),
  on(updateBreadcrumbs, (state, { index }) => {
    return { ...state, breadcrumbs: state.breadcrumbs.slice(0, index + 1) };
  }),
  on(clearBreadcrumbs, (state) => {
    return {
      ...state,
      breadcrumbs: [{ title: 'core.home', url: '', name: '', description: '' }],
    };
  })
);
