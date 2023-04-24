import { createAction, props } from '@ngrx/store';
import { IBreadCrumb } from 'src/app/shared/interfaces/breadcrumb.interface';

export const addBreadcrumb = createAction(
  '[Breadcrumbs] add breadcrumb',
  props<IBreadCrumb>()
);

export const updateBreadcrumbs = createAction(
  '[Breadcrumbs] update breadcrumbs',
  props<{ index: number }>()
);

export const clearBreadcrumbs = createAction('[Breadcrumbs] clear breadcrumbs');
