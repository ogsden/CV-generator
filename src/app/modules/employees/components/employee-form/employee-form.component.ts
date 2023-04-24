import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { IControl } from 'src/app/shared/interfaces/control.interface';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { getEmployeeById } from 'src/app/store/employees/selectors/employees.selector';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent {
  private readonly id: number;
  public employeeForm: FormGroup;
  public positions: IControl[];
  public skills: IControl[];
  public languages: IControl[];
  public loading: boolean;

  constructor(
    private store$: Store,
    private formBuilder: FormBuilder,
    private positonsService: PositionsService,
    private skillsService: SkillsService,
    private languagesService: LanguagesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.getControlsData();
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      skills: [[], [Validators.required]],
      position: ['', [Validators.required]],
      languages: [[], [Validators.required]],
      education: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.store$
      .select(getEmployeeById(this.id))
      .subscribe((employee) => this.employeeForm.patchValue(employee));
  }

  private getControlsData(): void {
    this.loading = true;

    forkJoin({
      positions: this.positonsService.getPositions(),
      skills: this.skillsService.getSkills(),
      languages: this.languagesService.getLanguages(),
    }).subscribe(({ positions, skills, languages }) => {
      this.positions = positions;
      this.skills = skills;
      this.languages = languages;
      this.loading = false;
      this.cdr.markForCheck();
    });
  }

  public getFormValue(): any {
    return this.employeeForm.value;
  }
}
