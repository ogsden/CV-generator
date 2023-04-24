import { ICv } from './cv.interface';

export interface IEmployee {
  username?: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  skills: number[];
  skillsNames?: string[];
  position: number;
  positionName?: string;
  languages: number[];
  languagesNames?: string[];
  education: string;
  description: string;
  id?: number;
  cvsNames?: string[];
  cvs: ICv[];
  project?: string[];
}
