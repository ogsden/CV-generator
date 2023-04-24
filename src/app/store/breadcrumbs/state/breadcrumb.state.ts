import { IBreadCrumb } from "src/app/shared/interfaces/breadcrumb.interface";

export interface IBreadcrumbState {
  breadcrumbs: IBreadCrumb[],
}

export const initialState: IBreadcrumbState = {
  breadcrumbs: [],
};
