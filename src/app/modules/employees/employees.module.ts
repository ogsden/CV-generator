import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SelectComponent } from 'src/app/shared/controls/select/select.component';
import { DatePickerComponent } from '../../shared/controls/date-picker/date-picker.component';
import { InputComponent } from '../../shared/controls/input/input.component';
import { MultipleSelectComponent } from '../../shared/controls/multiple-select/multiple-select.component';
import { TextareaComponent } from '../../shared/controls/textarea/textarea.component';
import { TableComponent } from '../../shared/table/table.component';
import { CvComponent } from './components/cv/cv.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    CvComponent,
    EmployeesListComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeFormComponent,
    ProjectFormComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    TranslateModule,
    MultipleSelectComponent,
    InputComponent,
    DatePickerComponent,
    TextareaComponent,
    TableComponent,
    NzButtonModule,
    NzTabsModule,
    ReactiveFormsModule,
    SelectComponent,
    MultipleSelectComponent,
    NzIconModule,
    NzCollapseModule,
    NzSpinModule,
  ],
})
export class EmployeesModule {}
