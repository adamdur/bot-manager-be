import app from './config/express';
import swagger from './config/swagger';
import logger from './src/middlewares/logger'
import v1routes from './src/routes/v1/index';
import swaggerUi from 'swagger-ui-express';
import CookieParser from 'cookie-parser';

app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next()
})

app.get('/swagger.json', (req, res) => {
    res.json(swagger);
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swagger)
);

app.use(CookieParser());
app.use(logger);
app.use('/api/v1', v1routes);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
    console.log(`Api docs running at http://${app.get('host')}:${app.get('port')}/api-docs`);
});

export default app;