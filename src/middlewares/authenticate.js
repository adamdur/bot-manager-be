import jwt from 'jsonwebtoken';
import User from '../models/users/user.model';
import knex from "../../config/knexconfig";
import * as helper from "../utils/helpers/errors.helper";

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */
export async function isAuthenticated(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    let token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    if (!token) return await helper.unauthorized(res, 'No token provided.');

    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.currentUser = await getCurrentUser(res, decoded.user.id);
        next();
    } catch (err) {
        try {
            let refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return await helper.unauthorized(res, 'Refresh token not found');

            const decoded = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

            const user = await getCurrentUser(res, decoded.id);
            req.currentUser = user;
            res.locals.newToken = await generateAccessToken(user);
            next();
        } catch (error) {
            return await helper.unauthorized(res, 'Token expired, please log in.');
        }
    }
};

export async function getCurrentUser(res, id) {
    const user = await User.query({where: {id: id}, select: ['id', 'email', 'username']}).fetch();
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
    return user;
}

export async function generateTokens(user) {
    const accessToken = jwt.sign({user: user}, process.env.TOKEN_SECRET_KEY, {expiresIn: process.env.TOKEN_LIFE});
    const refreshToken = jwt.sign({id: user.get('id')}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: process.env.REFRESH_TOKEN_LIFE});
    return {accessToken, refreshToken};
}

export async function generateAccessToken(user) {
    return jwt.sign({user: user}, process.env.TOKEN_SECRET_KEY, {expiresIn: process.env.TOKEN_LIFE});
}

export async function generateRefreshToken(user) {
    return jwt.sign({id: user.get('id')}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: process.env.REFRESH_TOKEN_LIFE});
}
