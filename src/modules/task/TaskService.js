import Task from './taskModel.js';
import { AppError } from '../../shared/utils/AppError.js';

class TaskService {
    async index(idUser) {
        const tasksUser = await Task.find({ userId: idUser });

        return tasksUser.map((task) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            created_at: task.createdAt
        }));
    }

    async show(idUser, idTask) {
        const task = await Task.findById(idTask);

        if (!task) {
            throw new AppError('Tarefa não encontrada.', 404);
        }

        // Compara ID do usuário vindo da autenticação com o ID do banco
        if (!task.userId.equals(idUser)) {
            throw new AppError('Acesso à tarefa não permitido.', 403);
        }

        return {
            id: task._id,
            title: task.title,
            description: task.description,
            created_at: task.createdAt
        };
    }

    async create(idUser, title, description) {
        if (!title) {
            throw new AppError('Informe o título da tarefa.', 400);
        }

        if (!description) {
            throw new AppError('Informe a descrição da tarefa.', 400);
        }

        const newTask = await Task.create({
            title,
            description,
            userId: idUser
        });

        return {
            id: newTask._id,
            title: newTask.title,
            description: newTask.description
        };
    }

    async update(idUser, idTask, title, description) {
        const task = await Task.findById(idTask);

        if (!task) {
            throw new AppError('Tarefa não encontrada.', 404);
        }

        if (!task.userId.equals(idUser)) {
            throw new AppError('Acesso à tarefa não permitdo.', 403);
        }

        if (title) task.title = title;

        if (description) task.description = description;

        await task.save();
    }

    async delete(idUser, idTask) {
        const task = await Task.findById(idTask);

        if (!task) {
            throw new AppError('Tarefa não encontrada.', 404);
        }

        if (!task.userId.equals(idUser)) {
            throw new AppError('Acesso à tarefa não permitdo.', 403);
        }

        await task.deleteOne();
    }
}

export default new TaskService();
