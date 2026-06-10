import express from 'express';
import cors from 'cors';
import rowsController from './controllers/rowsController';
import { AppDataSource } from './data-source';
import columnsController from './controllers/columnsController';
import resourcesController from './controllers/resourcesController';


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

app.get('/api/resources/:filename', resourcesController);
app.post('/api/getRows', rowsController);
app.get('/api/getColumns', columnsController);

app.listen(port);
