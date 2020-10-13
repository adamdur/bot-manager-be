import {StatusCodes} from 'http-status-codes';
import User from '../../models/users/user.model';
import logger from "../../../config/winston";
import * as helper from "../../utils/helpers/errors.helper";

/**
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findById(req, res) {
    try {
        let roleAuthorized = await helper.isUser(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.forge().where({id: req.params.id}).fetch({require: false, columns: ['id', 'email', 'username']})
        return res.json(user)
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function checkEmail(email, req=null, res=null) {
    try {
        if (req && res) {
            let roleAuthorized = await helper.isUser(req.currentUser);
            if (!roleAuthorized) return await helper.unauthorized(res);
        }

        let user = await User.where({'email': email}).fetch({require: false})
        if (req && res) {
            return res.json(!!user)
        }
        return !!user
    } catch (err) {
        if (req && res) {
            logger.log('error', err);
            return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: {message: err.message || 'Internal server error.'}});
        }
        return err
    }
}

/**
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function checkUsername(username, req=null, res=null) {
    try {
        if (req && res) {
            let roleAuthorized = await helper.isUser(req.currentUser);
            if (!roleAuthorized) return await helper.unauthorized(res);
        }

        let user = await User.where({'username': username}).fetch({require: false})
        if (req && res) {
            return res.json(!!user)
        }
        return !!user
    } catch (err) {
        if (req && res) {
            logger.log('error', err);
            return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
                .json({error: {message: err.message || 'Internal server error.'}});
        }
        return err
    }
}
