import express from 'express';
import cors from 'cors';
import sidebarController from './controllers/resourcesController';
import rowsController from './controllers/rowsController';
import { AppDataSource } from './data-source';
import columnsController from './controllers/columnsController';

import 'reflect-metadata';

const app = express();
const port = process.env.PORT || 8000;

AppDataSource.initialize();

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.use(express.json());

app.get('/api/sidebar', sidebarController);
app.get('/api/getRows', rowsController);
app.get('/api/getColumns', columnsController);

app.listen(port);
