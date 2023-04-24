import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {
  constructor(private translate: TranslateService) {}

  public changeLanguage() {
    const savedLanguage = localStorage.getItem('currentLang');
    if (savedLanguage === 'en') {
      this.translate.use('ru');
      localStorage.setItem('currentLang', 'ru');
    } else {
      this.translate.use(this.translate.getDefaultLang());
      localStorage.setItem('currentLang', 'en');
    }
  }
}
