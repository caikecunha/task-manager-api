import bcrypt from 'bcrypt';

export class PasswordHasher {
    static async createHash(password) {
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    }

    static async passwordIsValid(password, hash) {
        const isValid = await bcrypt.compare(password, hash);

        return isValid;
    }
}
