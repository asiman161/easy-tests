export class ProfileRegexps {
  regexps = {
    firstName: /^[\wа-яё]{2,15}$/i,
    lastName: /^[\wа-яё]{2,15}$/i,
    patronymic: /^[\wа-яё]{2,15}$/i,
    groupKey: /^[a-z0-9]{8,9}$/i,
    groupName: /^[\wа-яё\d\-]{2,25}$/,
    groupAge: /^\d{0,2}$/
  };
}

export interface ProfileRegexp {
  firstName: RegExp;
  lastName: RegExp;
  patronymic: RegExp;
  groupKey: RegExp;
  groupName: RegExp;
  groupAge: RegExp;
}
