import bcrypt from 'bcryptjs';

function encrypt(password: string) {
    return bcrypt.hashSync(password, 8);
}

function encryptValidate(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

export {encrypt, encryptValidate}
