import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IControl } from 'src/app/shared/interfaces/control.interface';
import { IProject } from 'src/app/shared/interfaces/project.interface';
import { RespService } from 'src/app/shared/services/resp.service';
import { SkillsService } from 'src/app/shared/services/skills.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormComponent implements OnInit {
  @Input() public projectsInfo: IProject[];
  @Input() public cvIndex: number;
  @Input() public skills: IControl[];
  @Input() public resp: IControl[];
  @Input() public projectIndex: number;
  public projectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private skillsService: SkillsService,
    private respService: RespService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.getControlsData();
    this.projectForm = this.formBuilder.group({
      id: [],
      name: [''],
      description: [''],
      domain: [''],
      internalName: [''],
      from: [null],
      to: [null],
      skills: [[]],
      responsibilities: [[]],
    });
    this.projectForm.patchValue(this.projectsInfo[this.projectIndex]);
  }

  private getControlsData(): void {
    this.skillsService.getSkills().subscribe((skills) => {
      this.skills = skills;
      this.cdr.markForCheck();
    });
    this.respService.getResp().subscribe((resp) => {
      this.resp = resp;
      this.cdr.markForCheck();
    });
  }

  public getProjectFormData(): any {
    return this.projectForm.value;
  }
}
