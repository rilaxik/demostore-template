import { encryptValidate } from './';
import { users } from '../consts';

export function validateRegistrationEmail(n: string): Promise<string> {
  const username: string = n.trim();
  const regex = new RegExp(
    '^(([^<>()[\\].,;:\\s@"]+(\\.[^<>()[\\].,;:\\s@"]+)*)|(".+"))@(([^<>()[\\].,;:\\s@"]+\\.)+[^<>()[\\].,;:\\s@"]{2,})$',
    'i'
  );

  return new Promise((resolve, reject) => {
    if (username.match(regex)) {
      resolve(username);
    }
    reject('Email is invalid');
  });
}

export function validateRegistrationPassword(p: string, p2: string): Promise<string> {
  const password: string = p.trim();
  const passwordRepeat = p2.trim();

  return new Promise((resolve, reject) => {
    if (password !== passwordRepeat) {
      reject('Passwords do not match');
    }
    if (password.length < 7) {
      reject('Password must be at least 8 symbols long');
    }
    resolve(password);
  });
}

export function validateLogin(login: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!Object.prototype.hasOwnProperty.call(users, login)) {
      reject('No user found');
    }
    if (encryptValidate(password, users[login].passwordHash)) {
      resolve(users[login].id);
    } else {
      reject('Passwords do not match');
    }
  });
}
