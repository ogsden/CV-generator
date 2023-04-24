import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private translate: TranslateService, private router: Router) {}

  public ngOnInit() {
    localStorage.setItem('currentLang', 'en');
    this.translate.use(this.translate.getDefaultLang());
  }
}
