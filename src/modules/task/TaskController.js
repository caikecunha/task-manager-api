import taskService from './TaskService.js';

class TaskController {
    async index(req, res) {
        // ID do usuário vem do payload da autenticação pelo JWT
        const { userID } = req;

        try {
            const tasks = await taskService.index(userID);

            return res.status(200).json({ tasks });
        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }

    async show(req, res) {
        const { userID } = req;
        const taskID = req.params.id;

        try {
            const task = await taskService.show(userID, taskID);

            return res.status(200).json({ task });
        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }

    async create(req, res) {
        const { userID } = req;
        const { title, description } = req.body;

        try {
            const newTask = await taskService.create(userID, title, description);

            return res.status(201).json({
                status: 'Nova tarefa criada com sucesso!',
                task: newTask
            });

        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }

    async update(req, res) {
        const { userID } = req;
        const taskID = req.params.id
        const { title, description } = req.body;

        try {
            await taskService.update(userID, taskID, title, description);

            return res.status(200).json({ status: 'Tarefa atualizada com sucesso!' });
        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }

    async delete(req, res) {
        const { userID } = req;
        const taskID = req.params.id;

        try {
            await taskService.delete(userID, taskID);

            return res.status(204).send();
        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }
}

export default new TaskController();
