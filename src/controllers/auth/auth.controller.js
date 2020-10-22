import bcrypt from 'bcrypt';
import User from '../../models/users/user.model';
import UserRoles from '../../models/users/user.roles.model';
import Roles from '../../models/users/roles.model';
import logger from '../../../config/winston';
import {StatusCodes} from 'http-status-codes';
import * as helper from "../../utils/helpers/errors.helper";
import {checkEmail, checkUsername} from "../users/users.controller";
import {generateTokens} from "../../middlewares/authenticate";
import knex from "../../../config/knexconfig";

/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function login(req, res) {
    const {email, password} = req.body;
    try {
        const user = await User.forge().where({email}).fetch({
            columns: ['id', 'email', 'username', 'active', 'password'],
            require: false
        });
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

        const validPassword = bcrypt.compareSync(password, user.get('password'));
        user.unset('password')
        if (!validPassword) return await helper.unauthorized(res, 'Authentication failed. Invalid password.');

        const {accessToken, refreshToken} = await generateTokens(user);

        let cookieOptions = {
            maxAge: 24 * 60 * 60,
            httpOnly: process.env.NODE_ENV !== 'development',
            expires: new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_LIFE)),
            secure: process.env.NODE_ENV !== 'development'
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        return res.status(StatusCodes.OK).json({
            token: accessToken,
            refreshToken,
            user
        });
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Returns jwt token after valid and successful registration
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function register(req, res) {
    const {email, username} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);

    try {
        const emailExists = await checkEmail(email);
        if (emailExists) return await helper.badRequest(res, 'Email already exists.');

        const usernameExists = await checkUsername(username);
        if (usernameExists) return await helper.badRequest(res, 'Username already exists.');

        const role = await Roles.forge().where({code: process.env.BASE_USER_ROLE}).fetch();
        if (!role) return await helper.unexpectedError(res);

        const user = await User.forge({email, username, password}).save();
        if (!user) return await helper.unexpectedError(res);

        await UserRoles.forge({user_id: user.get('id'), role_id: role.get('id')}).save();
        return await this.login(req, res);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}
