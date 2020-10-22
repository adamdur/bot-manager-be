import express from 'express';
import * as controller from '../../../controllers/user/user.controller';
import {isAuthenticated} from '../../../middlewares/authenticate';
import validate from '../../../../config/joi.validate';
import schema from '../../../utils/validators/user/validator.user';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, (req, res) => {
        controller.find(req, res);
    })

    .patch(isAuthenticated, validate(schema.updateUser), (req, res) => {
        controller.update(req, res);
    })

router.route('/inventory')
    .get(isAuthenticated, (req, res) => {
        controller.getInventory(req, res);
    })

export default router;
