import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BankTransactions } from './entities/BankTransactions';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'k.lebedev',
    password: '2479',
    database: 'analitycs_bdui',
    synchronize: true,
    logging: false,
    entities: [BankTransactions],
    migrations: [],
    subscribers: [],
});
