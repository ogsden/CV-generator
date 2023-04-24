import { IEmployee } from 'src/app/shared/interfaces/employees.interface';

export interface IEmployeesState {
  employees: IEmployee[];
  loading: boolean;
}

export const employeesInitialState: IEmployeesState = {
  employees: [],
  loading: false,
};
