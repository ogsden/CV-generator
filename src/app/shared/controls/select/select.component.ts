import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BaseControl } from '../../classes/base-control';
import { IControl } from '../../interfaces/control.interface';

@Component({
  standalone: true,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    NzSelectModule,
  ],
  providers: [],
})
export class SelectComponent extends BaseControl implements OnInit {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public errorMessage: string;
  @Input() public listOfOption: IControl[];

  constructor(
    private i18n: NzI18nService,
    ngControl: NgControl,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(ngControl, changeDetectorRef);
    this.i18n.setLocale(en_US);
  }
}
