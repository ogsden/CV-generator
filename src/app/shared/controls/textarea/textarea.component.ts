import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BaseControl } from '../../classes/base-control';

@Component({
  standalone: true,
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.less'],
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [],
})
export class TextareaComponent extends BaseControl {
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public errorMessage: string;
}
