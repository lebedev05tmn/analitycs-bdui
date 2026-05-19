import express from 'express';
import cors from 'cors';
import sidebarController from './controllers/resourcesController';
import tableController from './controllers/tableController';

const app = express();
const port = process.env.PORT || 8000;

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.use(express.json());

app.get('/api/sidebar', sidebarController);
app.get('/api/getTable', tableController);

app.listen(port);
