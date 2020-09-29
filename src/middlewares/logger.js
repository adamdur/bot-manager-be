import logger from '../../config/winston';

export default (req, res, next) => {
    let requestBody = (typeof req.body !== 'string') ? JSON.stringify(req.body) : req.body;
    logger.log('info', 'Method: ' + req.method + ' Path: ' + req.path + ' Request Body: ' + requestBody);
    logger.log('info', '--------------------------------------------------');
    next();
};
