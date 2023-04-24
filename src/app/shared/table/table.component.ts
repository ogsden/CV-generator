import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IColumn } from '../interfaces/column.interface';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  imports: [
    CommonModule,
    NzTableModule,
    NzDividerModule,
    RouterModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() public data: any[];
  @Input() public columns: IColumn[];
  @Output() rowClicked = new EventEmitter<number>();

  constructor(private i18n: NzI18nService) {
    this.i18n.setLocale(en_US);
  }

  public passId(id: number) {
    this.rowClicked.emit(id);
  }

  trackByColumnFn(index: number, column: any): any {
    return column.fieldName;
  }

  trackByDataFn(index: number, data: any): any {
    return data.id;
  }
}
