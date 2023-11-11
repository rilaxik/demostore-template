import bcrypt from 'bcryptjs';

export function encrypt(password: string): string {
  return bcrypt.hashSync(password, 8);
}

export function encryptValidate(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
