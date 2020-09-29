import app from './config/express';
import logger from './src/middlewares/logger'
import v1routes from './src/routes/v1/index';

app.use(logger);
app.use('/api/v1', v1routes);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});

export default app;