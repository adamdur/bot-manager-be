import express from 'express';
import * as controller from '../../../controllers/bots/bots.controller';
import isAuthenticated from '../../../middlewares/authenticate';
import validate from '../../../../config/joi.validate';
import schema from '../../../utils/validators/bots/validator.bots';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, (req, res) => {
        controller.findAll(req, res);
    })

    .post(isAuthenticated, validate(schema.addBot), (req, res) => {
        controller.create(req, res);
    })

router.route('/:id')
    .get(isAuthenticated, (req, res) => {
        controller.findById(req, res);
    })

router.route('/:id/renewals')
    .get(isAuthenticated, (req, res) => {
        controller.findRenewalsByBotId(req, res);
    })

    .post(isAuthenticated, validate(schema.addRenewal), (req, res) => {
        controller.addBotRenewal(req, res);
    })

export default router;
