import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEmployeesState } from '../state/employees.state';

export const state = createFeatureSelector<IEmployeesState>('employees');

export const getEmployees = createSelector(state, (state) => state.employees);

export const getEmployeesLoading = createSelector(
  state,
  (state: IEmployeesState) => state.loading
);

export const getEmployeeById = (employeeId: number) =>
  createSelector(getEmployees, (employees) =>
    employees.find((employee) => employee.id === employeeId)
  );

export const getCvsByEmployeeId = (employeeId: number) =>
  createSelector(getEmployeeById(employeeId), (employee) => employee?.cvs);
