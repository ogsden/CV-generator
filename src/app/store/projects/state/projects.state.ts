import { IProject } from 'src/app/shared/interfaces/project.interface';

export interface IProjectsState {
  projects: IProject[];
  loading: boolean;
}

export const projectsInitialState: IProjectsState = {
  projects: [],
  loading: false,
};
