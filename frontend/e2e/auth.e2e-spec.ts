import { browser, by, element } from 'protractor';
import { AuthUsersService, UserAuth } from './auth-users.service';
import { TextService } from './text.service';

describe('authentication users', () => {

  it('should create 3 users and sign-out from session', () => {
    const USERS: UserAuth[] = new AuthUsersService().users;
    const textService: TextService = new TextService();
    browser.get('/#/auth/sign-in');
    expect(browser.getCurrentUrl()).toMatch(/\/#\/auth\/sign-in$/);
    element(by.css('input[type=text]')).sendKeys(USERS[1].email);
    element.all(by.css('input[type=password]')).get(0).sendKeys(USERS[1].password);
    // element.all(by.css('input[type=password]')).get(1).sendKeys('teacher1');
    element(by.css('.btn')).click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/profile$/);
    element(by.cssContainingText('.btn.btn-default', 'Заполнить профиль')).click();
    element.all(by.css('input[type=radio]')).get(1).click();
    element.all(by.css('input[type=text]')).get(0).sendKeys(textService.generateText(5, {
      onlyText: true, lowerCase: true
    }));
    element.all(by.css('input[type=text]')).get(1).sendKeys(textService.generateText(5, {
      onlyText: true, lowerCase: true
    }));
    element.all(by.css('input[type=text]')).get(2).sendKeys(textService.generateText(5, {
      onlyText: true, lowerCase: true
    }));
    element.all(by.css('input[type=text]')).get(3).sendKeys(textService.generateText(10, {
      lowerCase: true
    }));
    element.all(by.css('input[type=text]')).get(4).sendKeys('3');
    element(by.cssContainingText('.btn.btn-success.btn-sm', 'Сохранить')).click();
    // element(by.cssContainingText('.navbar-profile button', 'Выход')).click();
    expect(browser.getCurrentUrl()).toMatch(/\/#\/group-list$/);
    browser.pause();
  });
});
