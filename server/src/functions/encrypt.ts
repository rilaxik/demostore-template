import * as bcrypt from 'bcryptjs';

function encrypt(password: string): string {
  return bcrypt.hashSync(password, 8);
}

function encryptValidate(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export { encrypt, encryptValidate };
