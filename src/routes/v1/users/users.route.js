import express from 'express';
import * as controller from '../../../controllers/users/users.controller';
import * as rolesController from '../../../controllers/users/users.roles.controller';
import isAuthenticated from '../../../middlewares/authenticate';
import validate from '../../../../config/joi.validate';
import schema from '../../../utils/validators/users/validator.users';
import roleSchema from '../../../utils/validators/users/validator.roles';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, (req, res) => {
        controller.findAll(req, res);
    })

    .post(isAuthenticated, validate(schema.saveUser), (req, res) => {
        controller.create(req, res);
    })

router.route('/roles')
    .get(isAuthenticated, (req, res) => {
        rolesController.findAll(req, res);
    })

    .post(isAuthenticated, validate(roleSchema.addRole), (req, res) => {
        rolesController.create(req, res);
    })

router.route('/:id')
    .get(isAuthenticated, (req, res) => {
        controller.findById(req, res);
    })

    .patch(isAuthenticated, (req, res) => {
        controller.update(req, res);
    })

    .delete(isAuthenticated, (req, res) => {
        controller.deleteUser(req, res);
    })

router.route('/:id/roles')
    .get(isAuthenticated, (req, res) => {
        rolesController.getUserRoles(req, res);
    })

    .post(isAuthenticated, validate(roleSchema.assignRole), (req, res) => {
        rolesController.assignUserRoles(req, res);
    })

    .delete(isAuthenticated, (req, res) => {
        rolesController.deleteUserRoles(req, res);
    })

router.route('/:id/password-change')
    .post(isAuthenticated, (req, res) => {
        controller.changePassword(req, res);
    })

router.route('/email')
    .post(isAuthenticated, validate(schema.checkEmail), (req, res) => {
        controller.checkEmail(req.body.email, req, res)
    })

router.route('/username')
    .post(isAuthenticated, validate(schema.checkUsername), (req, res) => {
        controller.checkUsername(req.body.username, req, res)
    })


export default router;
