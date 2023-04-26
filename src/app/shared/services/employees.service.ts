import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEmployee } from '../interfaces/employees.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly apiUrlRelations =
    'http://localhost:1337/api/users?populate=*';
  private readonly apiUrl = 'http://localhost:1337/api/users/';

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<IEmployee[]> {
    return this.http
      .get<any[]>(this.apiUrlRelations)
      .pipe(
        map((response) =>
          response.slice(1).map((item) => this.mapEmployeeData(item))
        )
      );
  }

  private mapEmployeeData(data: any): IEmployee {
    const employee: IEmployee = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      skills: data.skills.map((skill: any) => skill.id),
      skillsNames: data.skills.map((skill: any) => skill.name),
      position: data.position.id,
      positionName: data.position.name,
      languages: data.languages.map((language: any) => language.id),
      languagesNames: data.languages.map((language: any) => language.name),
      education: data.education,
      description: data.description,
      id: data.id,
      cvs: data.cvs.map((cv: any) => {
        return {
          id: cv.id,
          name: cv.name,
          description: cv.description,
          firstName: cv.firstName,
          lastName: cv.lastName,
          education: cv.education,
          languages: cv.languages.map((language: any) => language),
          skills: cv.skills.map((skill: any) => skill),
          position: cv.position,
          projectsNames: cv.projects.map((project: any) => project.name),
          projects: cv.projects.map((project: any) => {
            return {
              id: project.id,
              name: project.name,
              internalName: project.internalName,
              from: project.from,
              to: project.to,
              description: project.description,
              domain: project.domain,
              skills: project.skills,
              responsibilities: project.responsibilities,
            };
          }),
        };
      }),
      cvsNames: data.cvs.map((cv: any) => cv.name),
    };
    return employee;
  }

  public postEmployee(employee: IEmployee): Observable<any> {
    const payload = {
      username: employee.username,
      password: employee.password,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      confirmed: true,
      blocked: false,
      role: {
        connect: [
          {
            id: 2,
            description: 'Default role given to authenticated user.',
            name: 'Authenticated',
            type: 'Authenticated',
          },
        ],
      },
      skills: employee.skills,
      position: employee.position,
      languages: employee.languages,
      education: employee.education,
      description: employee.description,
      cvs: employee.cvs,
    };

    return this.http.post(this.apiUrlRelations, payload);
  }

  public putEmployee(employee: IEmployee): Observable<any> {
    const payload = {
      username: employee.username,
      password: employee.password,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      confirmed: true,
      blocked: false,
      role: {
        connect: [
          {
            id: 2,
            description: 'Default role given to authenticated user.',
            name: 'Authenticated',
            type: 'Authenticated',
          },
        ],
        disconnect: [
          {
            id: 2,
            description: 'Default role given to authenticated user.',
            name: 'Authenticated',
            type: 'Authenticated',
          },
        ],
      },
      skills: employee.skills,
      position: employee.position,
      languages: employee.languages,
      education: employee.education,
      description: employee.description,
      cvs: employee.cvs,
    };

    return this.http.put(this.apiUrl + employee.id, payload);
  }
}
