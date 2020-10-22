import express from 'express';
import * as controller from '../../../../controllers/admin/bots/bots.controller';
import {isAuthenticated} from '../../../../middlewares/authenticate';
import validate from '../../../../../config/joi.validate';
import schema from '../../../../utils/validators/bots/validator.bots';

const router = express.Router();

router.route('/')
    .post(isAuthenticated, validate(schema.addBot), (req, res) => {
        controller.create(req, res);
    })

router.route('/:id/renewals')
    .post(isAuthenticated, validate(schema.addRenewal), (req, res) => {
        controller.addBotRenewal(req, res);
    })

export default router;
