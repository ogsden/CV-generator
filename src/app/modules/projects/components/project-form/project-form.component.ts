import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { PROJECTS_ROUTE } from 'src/app/shared/constants/route-config';
import { IControl } from 'src/app/shared/interfaces/control.interface';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { RespService } from 'src/app/shared/services/resp.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { getProjectById } from 'src/app/store/projects/selectors/projects.selector';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements OnInit {
  @Input() public skills: IControl[];
  @Input() public resp: IControl[];
  @Output() public projectSaved = new EventEmitter<IProject>();
  private readonly id: number;
  private destroy$ = new Subject<void>();
  public projectForm: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private router: Router,
    private skillsService: SkillsService,
    private respService: RespService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.id = +this.route.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.getControlsData();
    this.projectForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      internalName: ['', [Validators.required]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
      skills: [[], [Validators.required]],
      responsibilities: [[], [Validators.required]],
    });

    this.store$
      .select(getProjectById(this.id))
      .subscribe((project) => this.projectForm.patchValue(project));
  }

  private getControlsData(): void {
    this.loading = true;

    forkJoin({
      skills: this.skillsService.getSkills(),
      resp: this.respService.getResp(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ skills, resp }) => {
        this.skills = skills;
        this.resp = resp;
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  public passProject(project: IProject): void {
    this.projectSaved.emit(project);
  }

  public onSubmit(): void {
    if (this.projectForm.invalid) {
      return this.projectForm.markAllAsTouched();
    }

    this.passProject({
      ...this.projectForm.value,
    });
    this.router.navigate([PROJECTS_ROUTE.path]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public cancel(): void {
    this.router.navigate([PROJECTS_ROUTE.path]);
  }
}
