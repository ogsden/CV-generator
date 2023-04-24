import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BaseControl } from '../../classes/base-control';
import { IControl } from '../../interfaces/control.interface';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Component({
  standalone: true,
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.less'],
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class MultipleSelectComponent extends BaseControl {
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
