import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.model';
import logger from '../../../config/winston';
import {StatusCodes} from 'http-status-codes';

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
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: {
                    message: 'User not found.'
                }
            });
        }

        const validPassword = bcrypt.compareSync(password, user.get('password'));
        if (!validPassword) {
            logger.log('error', 'Authentication failed. Invalid password.');
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: {
                    message: 'Invalid password'
                }
            });
        }

        const token = jwt.sign({
            id: user.get('id'),
            email: user.get('email')
        }, process.env.TOKEN_SECRET_KEY);

        return res.status(StatusCodes.OK).json({
            token,
            user
        });
    } catch (error) {
        logger.log('error', error);
        return res.status(error.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                message: error.message
            }
        })
    }
}
