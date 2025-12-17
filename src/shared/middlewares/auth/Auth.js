import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class Auth {
    static authenticate(req, res, next) {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: 'Login requerido.' });
        }

        const token = authorization.split(' ')[1];

        try {
            const data = jwt.verify(token, process.env.SECRET_TOKEN);

            req.userID = data.sub;

            return next();
        } catch (err) {
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }
    }
}
