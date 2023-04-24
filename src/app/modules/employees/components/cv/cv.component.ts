import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import jsPDF from 'jspdf';
import { Subscription, forkJoin } from 'rxjs';
import { IControl } from 'src/app/shared/interfaces/control.interface';
import { ICv } from 'src/app/shared/interfaces/cv.interface';
import { IEmployee } from 'src/app/shared/interfaces/employees.interface';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { loadEmployees } from 'src/app/store/employees/actions/employees.actions';
import {
  getCvsByEmployeeId,
  getEmployeeById,
  getEmployees,
} from 'src/app/store/employees/selectors/employees.selector';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent implements OnInit, OnDestroy {
  @ViewChildren(ProjectFormComponent)
  projectFormComponents: QueryList<ProjectFormComponent>;
  private readonly id: number;
  private employeeSub: Subscription;
  private employeesSub: Subscription;
  private cvsSub: Subscription;
  public cvs: string[] = [];
  public formArray: FormArray<FormGroup>;
  public positions: IControl[];
  public skills: IControl[];
  public languages: IControl[];
  public projects: IControl[];
  public selectedIndex: number = 0;
  public loading: boolean;

  constructor(
    private fb: FormBuilder,
    private store$: Store,
    private positonsService: PositionsService,
    private skillsService: SkillsService,
    private languagesService: LanguagesService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.formArray = new FormArray<FormGroup>([]);
    this.id = this.route.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.getControlsData();
    this.employeesSub = this.store$
      .select(getEmployees)
      .subscribe((employees) => {
        if (employees.length === 0) {
          this.store$.dispatch(loadEmployees());
        }
      });
    this.employeeSub = this.store$
      .select(getEmployeeById(+this.id))
      .subscribe((employee: IEmployee) => {
        if (employee !== undefined) {
          this.cvs = employee.cvsNames.slice();
          this.initFormArray();
        }
      });
    this.cvsSub = this.store$
      .select(getCvsByEmployeeId(+this.id))
      .subscribe((cvs: ICv[]) => {
        if (cvs !== undefined) {
          this.formArray.patchValue(cvs);
        }
      });
  }

  public trackByIndex(index: number, data: any): number {
    return index;
  }

  private getControlsData(): void {
    this.loading = true;
    forkJoin({
      positions: this.positonsService.getPositions(),
      skills: this.skillsService.getSkills(),
      languages: this.languagesService.getLanguages(),
      projects: this.projectsService.getProjects(),
    }).subscribe(({ positions, skills, languages, projects }) => {
      this.positions = positions;
      this.skills = skills;
      this.languages = languages;
      this.projects = projects.map((item) => {
        return { title: item.name, id: item.id };
      });
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  private initFormArray(): void {
    this.cvs.forEach(() => this.formArray.push(this.createFormGroup()));
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      id: [this.cvs.length],
      firstName: [''],
      lastName: [''],
      skills: [[]],
      position: [''],
      languages: [[]],
      education: [''],
      description: [''],
      project: [''],
      projectsNames: [[]],
      projects: [[]],
    });
  }

  public getFormGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  public addItem(): void {
    this.cvs.push(`cv ${this.cvs.length + 1}`);
    this.selectedIndex = this.cvs.length;
    this.formArray.push(this.createFormGroup());
  }

  public ngOnDestroy(): void {
    this.employeesSub?.unsubscribe();
    this.employeeSub?.unsubscribe();
    this.cvsSub?.unsubscribe();
  }

  public closeTab({ index }: { index: number }): void {
    this.cvs.splice(index, 1);
    this.formArray.removeAt(index);

    for (let i = index; i < this.formArray.length; i++) {
      const currentForm = this.formArray.at(i) as FormGroup;
      const currentId = currentForm.get('id').value;
      currentForm.patchValue({ id: currentId - 1 });
    }

    for (let i = index; i < this.cvs.length; i++) {
      const currentCv = this.cvs[i];
      const currentNumber = parseInt(currentCv.slice(2));
      this.cvs[i] = 'cv ' + (currentNumber - 1);
    }
  }

  public addProject(index: number) {
    const currentForm = this.formArray.at(index) as FormGroup;
    if (currentForm.value.project) {
      this.loading = true;
      this.projectsService.getProjects().subscribe((item) => {
        const selectedProject = item.filter(
          (item) => item.id === currentForm.value.project
        )[0];

        const updatedProjects = [
          ...currentForm.value.projects,
          selectedProject,
        ];

        const updatedProjectsNames = [
          ...currentForm.value.projectsNames,
          selectedProject.name,
        ];

        currentForm.patchValue({
          projects: updatedProjects,
          projectsNames: updatedProjectsNames,
        });
        this.loading = false;
        this.cdr.markForCheck();
      });
    }
  }

  public collectCvData(): ICv[] {
    const cvProjectFormsData: { [key: number]: any[] } = {};

    this.projectFormComponents.toArray().forEach((component) => {
      const cvIndex = component.cvIndex;
      const projectFormData = component.getProjectFormData();

      if (!cvProjectFormsData[cvIndex]) {
        cvProjectFormsData[cvIndex] = [];
      }

      cvProjectFormsData[cvIndex].push(projectFormData);
    });

    const allCVData = this.formArray.controls.map((cvForm, cvIndex) => {
      const projectsData = cvProjectFormsData[cvIndex] || [];

      return {
        ...cvForm.value,
        id: cvForm.value.id,
        name: `cv ${cvForm.value.id}`,
        projects: projectsData,
      };
    });

    return allCVData;
  }

  public removeProject(
    formIndex: number,
    projectIndex: number,
    event: MouseEvent
  ) {
    event.stopPropagation();

    const currentForm = this.formArray.at(formIndex) as FormGroup;
    const currentProjects = currentForm.get('projects') as FormArray;
    const currentProjectsNames = currentForm.get('projectsNames') as FormArray;

    const updatedProjects = currentProjects.value.filter(
      (_project: any, index: number) => index !== projectIndex
    );

    const updatedProjectsNames = currentProjectsNames.value.filter(
      (_projectName: any, index: number) => index !== projectIndex
    );

    currentForm.patchValue({
      projects: updatedProjects,
      projectsNames: updatedProjectsNames,
    });
  }

  public downloadPdf(): void {
    const allCVData = this.collectCvData();

    allCVData.forEach((cvData, index) => {
      const doc = new jsPDF();
      let yOffset = 20;

      doc.setFontSize(14);
      doc.text(cvData.name, 10, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      Object.entries(cvData).forEach(([key, value]) => {
        if (
          key !== 'projects' &&
          key !== 'name' &&
          key !== 'id' &&
          key !== 'project' &&
          key !== 'projectsNames'
        ) {
          doc.text(`${key}: ${value}`, 10, yOffset);
          yOffset += 6;
        } else if (key === 'projects') {
          doc.text('Projects:', 10, yOffset);
          yOffset += 6;

          value.forEach((project: any) => {
            doc.text(`- ${project.name}`, 14, yOffset);
            yOffset += 6;

            Object.entries(project).forEach(([projectKey, projectValue]) => {
              if (projectKey !== 'name' && projectKey !== 'id') {
                doc.text(`${projectKey}: ${projectValue}`, 18, yOffset);
                yOffset += 6;
              }
            });
          });
        }
      });

      doc.save(`CV${index + 1}.pdf`);
    });
  }
}
