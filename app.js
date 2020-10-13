import app from './config/express';
import swagger from './config/swagger';
import logger from './src/middlewares/logger'
import v1routes from './src/routes/v1/index';
import swaggerUi from 'swagger-ui-express';

app.get('/swagger.json', (req, res) => {
    res.json(swagger);
});

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swagger)
);

app.use(logger);
app.use('/api/v1', v1routes);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
    console.log(`Api docs running at http://${app.get('host')}:${app.get('port')}/api-docs`);
});

export default app;