import userService from './UserService.js';

class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;

        try {
            await userService.create(name, email, password);

            return res.status(201).json({ status: 'Usuário criado com sucesso!' });

        } catch (err) {

            if (err.code === 11000) {
                return res.status(422).json({ error: 'E-mail já cadastrado.' });
            }

            return res.status(500).json({ error: err.message });
        }
    }

    async show(req, res) {
        const { userID } = req;

        try {
            const user = await userService.show(userID);

            return res.status(200).json({ user });

        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }

    async update(req, res) {
        const { userID } = req;
        const { name, password } = req.body;

        try {
            const userUpdate = await userService.update(userID, name, password);

            return res.status(200).json({
                status: 'Dados atualizados com sucesso!',
                user: userUpdate
            });

        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }

    async delete(req, res) {
        const { userID } = req;
        const { password } = req.body;

        try {
            await userService.delete(userID, password);

            return res.status(204).send();

        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }
}

export default new UserController();
