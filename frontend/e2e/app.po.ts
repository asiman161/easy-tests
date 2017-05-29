import { browser, by, element } from 'protractor';

export class AngCliPage {
  navigateTo() {
    return browser.get('/#/auth/sign-in');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
