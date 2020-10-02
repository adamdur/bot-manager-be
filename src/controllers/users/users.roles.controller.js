import {StatusCodes} from 'http-status-codes';
import User from '../../models/users/user.model';
import Roles from '../../models/users/roles.model';
import UserRoles from '../../models/users/user.roles.model';
import logger from "../../../config/winston";
import * as helper from "../../utils/helpers/errors.helper";
import knex from "../../../config/knexconfig";

/**
 * Find all roles
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const roles = await Roles.forge().fetchAll()
        return res.json(roles.toJSON())
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Create role
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function create(req, res) {
    const {code} = req.body;
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const role = await Roles.forge().where({code}).fetch({require: false});
        if (role) return await helper.alreadyExists(res, 'Role with the same code already exists');

        const newRole = await Roles.forge({code}).save();
        if (newRole) {
            res.json({
                success: true,
                data: newRole.toJSON()
            });
        }
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Get user roles
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getUserRoles(req, res) {
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.where({id: req.params.id}).fetch({require: false});
        if (!user) return await helper.notFound(res, 'User not found.');

        const roles = await knex
            .select('ur.role_id AS role_id', 'r.code AS code')
            .from('user_roles AS ur')
            .leftJoin('roles AS r', {'r.id': 'ur.role_id'})
            .where('ur.user_id', user.get('id'));
        return res.json(roles)
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Assing user roles
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function assignUserRoles(req, res) {
    const {code} = req.body;
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.where({id: req.params.id}).fetch({require: false});
        if (!user) return await helper.notFound(res, 'User not found.');

        const role = await Roles.forge().where({code}).fetch({require: false});
        if (!role) return await helper.notFound(res, `Role with code '${code}' not found.`);

        const userRole = await UserRoles.forge().where({
            user_id: user.get('id'),
            role_id: role.get('id')
        }).fetch({require: false});
        if (userRole) return await helper.alreadyExists(res, `User has already been assigned role '${role.get('code')}'.`);

        const newUserRole = await UserRoles.forge({
            user_id: user.get('id'),
            role_id: role.get('id')
        }).save();

        res.json({
            success: true,
            data: newUserRole.toJSON()
        });
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}

/**
 * Delete user roles
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function deleteUserRoles(req, res) {
    const {code} = req.body;
    try {
        let roleAuthorized = await helper.isAdmin(req.currentUser);
        if (!roleAuthorized) return await helper.unauthorized(res);

        const user = await User.where({id: req.params.id}).fetch({require: false});
        if (!user) return await helper.notFound(res, 'User not found.');

        const role = await Roles.forge().where({code}).fetch({require: false});
        if (!role) return await helper.notFound(res, `Role with code '${code}' not found.`);

        const userRole = await UserRoles.forge().where({
            user_id: user.get('id'),
            role_id: role.get('id')
        }).fetch({require: false});
        if (!userRole) return await helper.alreadyExists(res, `User has not been assigned role '${role.get('code')}'.`);

        const deleted = await userRole.destroy();
        return res.json(!!deleted);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR)
            .json({error: {message: err.message || 'Internal server error.'}});
    }
}
