import { AngCliPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('ang-cli App', () => {
  let page: AngCliPage;

  beforeEach(() => {
    page = new AngCliPage();
  });

  it('should display message saying app works', () => {
    /*page.navigateTo();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/auth\/sign-in$/);
    element(by.css('input[type=text]')).sendKeys('teacher@th.th');
    element.all(by.css('input[type=password]')).get(0).sendKeys('teacher1');
    //element.all(by.css('input[type=password]')).get(1).sendKeys('teacher1');
    element(by.css('.btn')).click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/profile$/);
    element(by.cssContainingText('.navbar-profile button', 'sign out')).click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/auth\/sign-in$/);*/
    //expect(page.getParagraphText()).toEqual('app works!');
  });
});
