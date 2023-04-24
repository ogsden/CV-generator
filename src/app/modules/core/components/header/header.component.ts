import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private translate: TranslateService;

  constructor(translate: TranslateService, private router: Router) {
    this.translate = translate;
  }

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

  public signOut(): void {
    this.router.navigate(['/auth']);
    localStorage.removeItem('auth-token');
  }
}
