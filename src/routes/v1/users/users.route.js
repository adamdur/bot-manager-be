import express from 'express';
import * as controller from '../../../controllers/users/users.controller';
import isAuthenticated from '../../../middlewares/authenticate';
import validate from '../../../../config/joi.validate';
import schema from '../../../utils/validators/users/validator.users';

const router = express.Router();

router.route('/')
    .get((req, res) => {
        controller.findAll(req, res);
    })

    .post(validate(schema.saveUser), (req, res) => {
        controller.create(req, res);
    })

router.route('/:id')
    .get((req, res) => {
        controller.findById(req, res);
    })

    .patch(isAuthenticated, (req, res) => {
        controller.update(req, res);
    })

    .delete(isAuthenticated, (req, res) => {
        controller.deleteUser(req, res);
    })

router.route('/:id/password-change')
    .post(isAuthenticated, (req, res) => {
        controller.changePassword(req, res);
    })

router.route('/email')
    .post(validate(schema.checkEmail), (req, res) => {
        controller.checkEmail(req.body.email, req, res)
    })

router.route('/username')
    .post(validate(schema.checkUsername), (req, res) => {
        controller.checkUsername(req.body.username, req, res)
    })


export default router;
