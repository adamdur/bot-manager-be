import express from 'express';
import * as controller from '../../../controllers/auth/auth.controller';
import schema from '../../../utils/validators/auth/validator.auth';
import validate from "../../../../config/joi.validate";

const router = express.Router();

router.route('/login')
    .post(validate(schema.login), (req, res) => {
        controller.login(req, res);
    });

router.route('/register')
    .post((req, res) => {
        controller.register(req, res);
    });

export default router;
