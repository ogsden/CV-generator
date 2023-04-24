import { IProject } from './project.interface';

export interface ICv {
  id?: number;
  name: string;
  description: string;
  firstName: string;
  lastName: string;
  education: string;
  languages: number[];
  skills: number[];
  position: number;
  projectsNames?: string[];
  projects: IProject[];
}
