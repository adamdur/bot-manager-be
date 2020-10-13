import express from 'express';
import * as controller from '../../../controllers/bots/bots.controller';
import isAuthenticated from '../../../middlewares/authenticate';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, (req, res) => {
        controller.findAll(req, res);
    })

router.route('/:id')
    .get(isAuthenticated, (req, res) => {
        controller.findById(req, res);
    })

router.route('/:id/renewals')
    .get(isAuthenticated, (req, res) => {
        controller.findRenewalsByBotId(req, res);
    })
export default router;
