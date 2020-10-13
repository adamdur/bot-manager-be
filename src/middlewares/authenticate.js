import jwt from 'jsonwebtoken';
import User from '../models/users/user.model';
import knex from "../../config/knexconfig";
import * as helper from "../utils/helpers/errors.helper";

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */
export default async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    let token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;

    if (!token) return await helper.unauthorized(res, 'No token provided.');

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return await helper.unauthorized(res, 'Not authorized.');
        }
        const user = await User.query({where: {id: decoded.id}, select: ['id', 'email', 'username']}).fetch();
        if (!user) return await helper.notFound(res, 'User not found.');

        const roles = await knex
            .select('ur.role_id AS role_id', 'r.code AS code')
            .from('user_roles AS ur')
            .leftJoin('roles AS r', {'r.id': 'ur.role_id'})
            .where('ur.user_id', user.get('id'));
        let rolesArr = {};
        for (let role of roles) {
            rolesArr[role.role_id] = role.code;
        }
        user.set('roles', rolesArr);

        req.currentUser = user;
        next();
    });
};
