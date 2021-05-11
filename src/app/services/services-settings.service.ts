import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesSettingsService {
  private element = document.querySelector('#theme');

  constructor() {
    const url =
      localStorage.getItem('theme') || './assets/css//colors/purple-dark.css';
    this.element?.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css//colors/${theme}.css`;
    console.log(url);
    this.element?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.Checks();
  }

  Checks() {
    const links = document.querySelectorAll('.selector');
    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css//colors/${btnTheme}.css`;
      const current = this.element?.getAttribute('href');

      // tslint:disable-next-line: triple-equals
      if (btnThemeUrl === current) {
        element.classList.add('working');
      }
    });
  }
}
