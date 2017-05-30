import { TextService } from './text.service';

export interface UserAuth {
  email: string;
  password: string;
  key?: string;
}

export class AuthUsersService {
  private _users: UserAuth[] = [{
    email: 'student@st.st',
    password: 'student1'
  }, {
    email: 'elder@el.el',
    password: 'elder111'
  }, {
    email: 'teacher@th.th',
    password: 'teacher1',
    key: '11111111'
  }];
  private _textService: TextService;

  constructor() {
  }

  get users() {
    return this._users;
  }

  private generateUsers(usersCount: number = 3) {
    let users: UserAuth[] = [];
    for (let i = 0; i < usersCount; i++) {
      users.push({
        email: `${this._textService.generateText(20, {lowerCase: true})}@random.com`,
        password: `${this._textService.generateText(20)}`
      });
    }
    console.log(this._users);
    this._users = users;
  }
}
