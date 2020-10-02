import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/users/user.model';
import UserRoles from '../../models/users/user.roles.model';
import Roles from '../../models/users/roles.model';
import logger from '../../../config/winston';
import {StatusCodes} from 'http-status-codes';
import * as helper from "../../utils/helpers/errors.helper";
import {checkEmail, checkUsername} from "../users/users.controller";

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
        const user = await User.where({email: email}).fetch();
        if (!user) return await helper.notFound(res, 'User not found.');

        const validPassword = bcrypt.compareSync(password, user.get('password'));
        if (!validPassword) return await helper.unauthorized(res, 'Authentication failed. Invalid password.');

        const token = jwt.sign({
            id: user.get('id'),
            email: user.get('email')
        }, process.env.TOKEN_SECRET_KEY);

        return res.status(StatusCodes.OK).json({
            token,
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
