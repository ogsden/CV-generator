import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DatePickerComponent } from 'src/app/shared/controls/date-picker/date-picker.component';
import { InputComponent } from 'src/app/shared/controls/input/input.component';
import { MultipleSelectComponent } from 'src/app/shared/controls/multiple-select/multiple-select.component';
import { TextareaComponent } from 'src/app/shared/controls/textarea/textarea.component';
import { TableComponent } from '../../shared/table/table.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { ProjectsRoutingModule } from './projects-routing.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    ProjectFormComponent,
    ProjectsListComponent,
    ProjectEditComponent,
    ProjectCreateComponent,
  ],
  imports: [
    NzLayoutModule,
    CommonModule,
    ProjectsRoutingModule,
    TranslateModule,
    TableComponent,
    DatePickerComponent,
    TextareaComponent,
    InputComponent,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    MultipleSelectComponent,
    NzListModule,
    NzSpinModule,
  ],
})
export class ProjectsModule {}
