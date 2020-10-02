import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/users/user.model';
import logger from '../../../config/winston';
import {StatusCodes} from 'http-status-codes';
import * as helper from "../../utils/helpers/errors.helper";

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
