import jwt from 'jsonwebtoken';
import User from '../models/user.model';

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

export default (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;

    if (!token) {
        res.status(403).json({
            error: 'No token provided'
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: {
                    message: 'Not authorized.'
                }
            });
        }
        User.query({
            where: {id: decoded.id},
            select: ['email', 'id']
        }).fetch().then(user => {
            if (!user) {
                res.status(404).json({error: 'User not found.'});
            } else {
                req.currentUser = user;
                next();
            }
        });
    });
};
