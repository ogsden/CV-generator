import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBreadCrumb } from 'src/app/shared/interfaces/breadcrumb.interface';
import { updateBreadcrumbs } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';
import { getBreadcrumbs } from 'src/app/store/breadcrumbs/selectors/breadcrumbs.selector';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  public breadcrumbs$: Observable<IBreadCrumb[]>;
  public name: string;
  public description: string;

  constructor(private store$: Store) {
    this.breadcrumbs$ = this.store$.select(getBreadcrumbs);
    this.breadcrumbs$.subscribe((response) => {
      if (response.length > 0) {
        this.name = response[response.length - 1].name;
        this.description = response[response.length - 1].description;
      }
    });
  }

  public trackByBreadcrumbFn(breadcrumb: any): any {
    return breadcrumb.url;
  }

  public updateBreadcrumb(index: any) {
    this.store$.dispatch(updateBreadcrumbs({ index }));
  }
}
