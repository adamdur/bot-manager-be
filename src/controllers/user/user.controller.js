import {StatusCodes} from 'http-status-codes';
import User from '../../models/users/user.model';
import {Inventory} from "../../models/inventory/inventory.model";
import logger from "../../../config/winston";
import * as helper from "../../utils/helpers/errors.helper";
import bcrypt from "bcrypt";
import {checkUsername} from "../users/users.controller"

/**
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function find(req, res) {
    try {
        let roleAuthorized = await helper.isUser(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.forge().where({id: req.currentUser.get('id')}).fetch({require: false});
        if (!user) return await helper.notFound(res, `User not found.`);

        return res.json(user);
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
export async function update(req, res) {
    let {username, old_password, new_password, new_password_check} = req.body;
    let userData = {};
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.where({id: req.currentUser.get('id')}).fetch({require: false})
        if (!user) return await helper.notFound(res, 'User not found.');

        if (username !== req.currentUser.get('username')) {
            const usernameExists = await checkUsername(username);
            if (usernameExists) return await helper.badRequest(res, 'Username already exists.');
            userData.username = username;
        }

        if (old_password && new_password && new_password_check) {
            const validPassword = bcrypt.compareSync(old_password, user.get('password'));
            if (!validPassword) return await helper.unauthorized(res, 'Invalid old password.');

            if (new_password === old_password) return await helper.badRequest(res, 'New password is same as previous password.');

            const validPasswordCheck = new_password === new_password_check;
            if (!validPasswordCheck) return await helper.unauthorized(res, 'New passwords does not match.');

            userData.password = bcrypt.hashSync(new_password, 10);
        }

        const updatedUser = await user.save(userData);
        return res.json(updatedUser ? updatedUser.toJSON() : null);
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
export async function getInventory(req, res) {
    try {
        let roleAuthorized = await helper.isUser(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.forge().where({id: req.currentUser.get('id')}).fetch({require: false});
        if (!user) return await helper.notFound(res, `User not found.`);

        const inventory = await Inventory.forge()
            .where({user_id: req.currentUser.get('id')})
            .fetchAll({withRelated: ['purchase', 'sale', 'rentals', 'trade_in', 'trade_out']});

        return res.json(inventory);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}
