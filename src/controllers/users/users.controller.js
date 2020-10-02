import bcrypt from 'bcrypt';
import {StatusCodes} from 'http-status-codes';
import User from '../../models/users/user.model';
import logger from "../../../config/winston";
import * as helper from "../../utils/helpers/errors.helper";

/**
 * Find all users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const users = await User.forge().fetchAll();
        return res.json(users.toJSON())
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Find user by id
 *
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
 * Update user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function update(req, res) {
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.where({id: req.params.id}).fetch({require: false})
        if (!user) return await helper.notFound(res, 'User not found.');

        const updatedUser = await user.save(req.body);
        return res.json(updatedUser ? updatedUser.toJSON() : null);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Change user password
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function changePassword(req, res) {
    const {old_password, new_password, new_password_check} = req.body;
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.where({id: req.params.id}).fetch({require: false});
        if (!user) return await helper.notFound(res, 'User not found.');

        const validPassword = bcrypt.compareSync(old_password, user.get('password'));
        if (!validPassword) return await helper.unauthorized(res, 'Invalid old password.');

        if (new_password === old_password) return await helper.unauthorized(res, 'New password is same as previous password.');

        const validPasswordCheck = new_password === new_password_check;
        if (!validPasswordCheck) return await helper.unauthorized(res, 'New passwords does not match.');

        const password = bcrypt.hashSync(new_password, 10);
        const updatedPassword = await user.save({password: password});
        return res.json(updatedPassword ? updatedPassword.toJSON() : null);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Delete user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function deleteUser(req, res) {
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.where({id: req.params.id}).fetch({require: false})
        if (!user) return await helper.notFound(res, 'User not found.');

        const deleted = await user.destroy();
        return res.json(!!deleted);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Create user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function create(req, res) {
    const {email, username} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);

    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const emailExists = await checkEmail(email);
        const usernameExists = await checkUsername(username);

        if (emailExists) return await helper.badRequest(res, 'Email already exists.');
        if (usernameExists) return await helper.badRequest(res, 'Username already exists.');

        const user = await User.forge({email, username, password}).save();
        if (user) {
            res.json({
                success: true,
                data: user.toJSON()
            });
        }
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 *  Check if user with email exists
 *
 * @param {string} email
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
 *  Check if user with username exists
 *
 * @param {string} username
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
