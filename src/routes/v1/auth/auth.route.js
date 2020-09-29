import express from 'express';
import * as controller from '../../../controllers/auth/auth.controller';

const router = express.Router();

router.route('/login')
    .post((req, res) => {
        controller.login(req, res);
    });

export default router;
