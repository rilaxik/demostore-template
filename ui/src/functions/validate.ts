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
