import { createReducer, on } from '@ngrx/store';
import {
  employeeSaved,
  employeesLoaded,
  loadEmployees,
} from '../actions/employees.actions';
import { employeesInitialState } from '../state/employees.state';

export const employeesReducer = createReducer(
  { ...employeesInitialState, loading: false },
  on(loadEmployees, (state) => ({
    ...state,
    loading: true,
  })),
  on(employeesLoaded, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
  })),

  on(employeeSaved, (state, result) => ({
    ...state,
    employees: [...state.employees, result.employee],
  }))
);
