import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EMPLOYEES_ROUTE,
  PROJECTS_ROUTE,
} from 'src/app/shared/constants/route-config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  public projectsRoute = PROJECTS_ROUTE;
  public employeesRoute = EMPLOYEES_ROUTE;
  public isCollapsed = false;

  public toggleCollapsed() {
    if (this.isCollapsed === false) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
  }
}
