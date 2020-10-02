import express from 'express';
import * as controller from '../../../controllers/auth/auth.controller';

const router = express.Router();

router.route('/login')
    .post((req, res) => {
        controller.login(req, res);
    });

router.route('/register')
    .post((req, res) => {
        controller.register(req, res);
    });

export default router;
