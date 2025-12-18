import tokenService from './TokenService.js';

class TokenController {
    async create(req, res) {
        const { email, password } = req.body;

        try {
            const token = await tokenService.create({ email, password });

            return res.status(200).json({ token });
        } catch (err) {
            const statusError = err.statusCode || 500;

            return res.status(statusError).json({ error: err.message });
        }
    }
}

export default new TokenController();
