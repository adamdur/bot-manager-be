import bcrypt from 'bcrypt';
import {StatusCodes} from 'http-status-codes';
import User from '../../models/user.model';
import logger from "../../../config/winston";

/**
 * Find all users
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    try {
        const users = await User.forge().fetchAll();
        res.json({
            data: users.toJSON()
        })
    } catch (err) {
        res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err
        })
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
        const user = await User.where({id: req.params.id}).fetch({require: false})
        return res.json(user)
    } catch (err) {
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err
        })
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
        const user = await User.where({id: req.params.id}).fetch({require: false})
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: {
                    message: 'User not found.'
                }
            })
        }
        const updatedUser = await user.save(req.body);
        return res.json(updatedUser ? updatedUser.toJSON() : null);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                message: err.message
            }
        })
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
        const user = await User.where({id: req.params.id}).fetch({require: false})
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: {
                    message: 'User not found.'
                }
            })
        }

        const validPassword = bcrypt.compareSync(old_password, user.get('password'));
        if (!validPassword) {
            logger.log('error', 'Invalid old password.');
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: {
                    message: 'Invalid old password'
                }
            });
        }

        if (new_password === old_password) {
            logger.log('error', 'New password is same as previous password.');
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: {
                    message: 'New password is same as previous password'
                }
            });
        }

        const validPasswordCheck = new_password === new_password_check;
        if (!validPasswordCheck) {
            logger.log('error', 'New passwords does not match.');
            return res.status(StatusCodes.UNAUTHORIZED).json({
                error: {
                    message: 'New passwords does not match'
                }
            });
        }

        const password = bcrypt.hashSync(new_password, 10);
        const updatedPassword = await user.save({password: password});
        return res.json(updatedPassword ? updatedPassword.toJSON() : null);
    } catch (err) {
        logger.log('error', err);
        return res.status(err.code || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                message: err.message
            }
        })
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
        const user = await User.where({id: req.params.id}).fetch({require: false})
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: {
                    message: 'User not found.'
                }
            })
        }
        const deleted = await user.destroy();
        return res.json(!!deleted);
    } catch (err) {
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err
        })
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
        const emailExists = await checkEmail(email);
        const usernameExists = await checkUsername(username);

        if (emailExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Email already exists'
            });
        }
        if (usernameExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Username already exists'
            });
        }

        const user = await User.forge({email, username, password}).save();
        if (user) {
            res.json({
                success: true,
                data: user.toJSON()
            });
        }
    } catch (err) {
        res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: err
        })
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
        let user = await User.where({'email': email}).fetch({require: false})
        if (req && res) {
            return res.json(!!user)
        }
        return !!user
    } catch (err) {
        if (req && res) {
            return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: err
            })
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
        let user = await User.where({'username': username}).fetch({require: false})
        if (req && res) {
            return res.json(!!user)
        }
        return !!user
    } catch (err) {
        if (req && res) {
            return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: err
            })
        }
        return err
    }
}
