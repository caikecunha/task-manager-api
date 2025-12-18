import User from './userModel.js';
import { PasswordHasher } from '../../shared/utils/PasswordHasher.js';
import { AppError } from '../../shared/utils/AppError.js';
import Task from '../../modules/task/taskModel.js';
import { DateFormat } from '../../shared/utils/DateFormat.js';

class UserService {
    async show(idUser) {
        const user = await User.findById(idUser);

        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: DateFormat.format(user.createdAt)
        }
    }

    async create(name, email, password) {
        if (!name || !email || !password) {
            throw new AppError('Informe seu nome, email e senha.', 400)
        }

        // Criando hash da senha
        const passwordHash = await PasswordHasher.createHash(password);

        await User.create({
            name,
            email,
            passwordHash
        });
    }

    async update(idUser, name, password) {
        const user = await User.findById(idUser);

        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        if (name) user.name = name;

        if (password) user.passwordHash = await PasswordHasher.createHash(password);

        await user.save();

        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

    async delete(idUser, password) {
        if (!password) {
            throw new AppError('Informe a senha.', 400);
        }

        const user = await User.findById(idUser);

        if (!user) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        const passwordValid = await PasswordHasher.passwordIsValid(password, user.passwordHash);

        if (!passwordValid) {
            throw new AppError('Senha inválida.', 403);
        }

        // Deletar todas as tasks do usuário
        await Task.deleteMany({ userId: idUser });

        await user.deleteOne();
    }
}

export default new UserService();
