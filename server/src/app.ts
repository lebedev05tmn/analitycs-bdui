import express from 'express';
import sidebarRouter from './routes/resourcesRouter';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;

app.use(
    express.json(),
    cors({
        origin: 'http://localhost:5173', // или порт вашего React приложения
    })
);

app.get('/api/sidebar', sidebarRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
