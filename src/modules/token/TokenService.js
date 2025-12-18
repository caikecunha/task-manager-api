import User from '../user/userModel.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../../shared/utils/AppError.js';
import { PasswordHasher } from '../../shared/utils/PasswordHasher.js';
import 'dotenv/config';

class TokenService {
    async create({ email, password }) {

        if (!email || !password) {
            throw new AppError('Informe o email e senha.', 400);
        }

        email = email.toLowerCase().trim();

        const user = await User.findOne({ email });

        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        // Comparar hash da senha
        const passwordValid = await PasswordHasher.passwordIsValid(password, user.passwordHash);

        if (!passwordValid) {
            throw new AppError('Senha inválida.', 401);
        }

        const token = jwt.sign(
            { sub: user._id },
            process.env.SECRET_TOKEN,
            { expiresIn: process.env.EXPIRE_TOKEN }
        );

        return token;
    }
}

export default new TokenService();
