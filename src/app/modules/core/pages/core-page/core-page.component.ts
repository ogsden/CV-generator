import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { clearBreadcrumbs } from 'src/app/store/breadcrumbs/actions/breadcrumbs.actions';

@Component({
  selector: 'app-core-page',
  templateUrl: './core-page.component.html',
  styleUrls: ['./core-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorePageComponent {
  private translate: TranslateService;

  constructor(translate: TranslateService, private store$: Store) {
    this.translate = translate;
  }

  public ngOnInit(): void {
    this.store$.dispatch(clearBreadcrumbs());
    this.translate.use(localStorage.getItem('currentLang'));
  }
}
