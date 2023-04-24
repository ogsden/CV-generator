import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';

import { BaseControl } from '../../classes/base-control';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Component({
  standalone: true,
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.less'],
  imports: [
    CommonModule,
    NzDatePickerModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    NzFormModule,
  ],
  providers: [],
})
export class DatePickerComponent extends BaseControl {
  @Input() public label: string;
  @Input() public errorMessage: string;

  constructor(
    private i18n: NzI18nService,
    ngControl: NgControl,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(ngControl, changeDetectorRef);
    this.i18n.setLocale(en_US);
  }

  public onMoveFocus(): void {
    this.control.markAsTouched();
  }
}
