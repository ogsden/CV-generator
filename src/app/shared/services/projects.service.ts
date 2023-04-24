import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProject } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly apiUrlRelations =
    'https://cv-generator-backend.onrender.com/api/projects?populate=*';
  private readonly apiUrl =
    'https://cv-generator-backend.onrender.com/api/projects/';

  constructor(private http: HttpClient) {}

  public getProjects(): Observable<IProject[]> {
    return this.http
      .get<{ data: any[] }>(this.apiUrlRelations)
      .pipe(
        map((response) =>
          response.data.map((item) => this.mapProjectData(item))
        )
      );
  }

  private mapProjectData(data: any): IProject {
    const project: IProject = {
      id: data.id,
      name: data.attributes.name,
      internalName: data.attributes.internalName,
      from: data.attributes.from,
      to: data.attributes.to,
      description: data.attributes.description,
      domain: data.attributes.domain,
      skills: data.attributes.skills.data.map((skill: any) => skill.id),
      responsibilities: data.attributes.responsibilities.data.map(
        (resp: any) => resp.id
      ),
    };
    return project;
  }

  public postProject(project: IProject): Observable<any> {
    const payload = {
      data: {
        name: project.name,
        internalName: project.internalName,
        from: project.from,
        to: project.to,
        description: project.description,
        domain: project.domain,
        skills: project.skills,
        responsibilities: project.responsibilities,
      },
    };

    return this.http.post(this.apiUrlRelations, payload);
  }

  public putProjects(project: IProject): Observable<any> {
    const payload = {
      data: {
        name: project.name,
        internalName: project.internalName,
        from: project.from,
        to: project.to,
        description: project.description,
        domain: project.domain,
        skills: project.skills,
        responsibilities: project.responsibilities,
      },
    };

    return this.http.put(this.apiUrl + project.id, payload);
  }
}
